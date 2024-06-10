let allData = {};

function fetchDataAndCreateChart(url, chartId, chartLabel, sliderId, labelId, orderId, dataKey, chartType) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      allData[dataKey] = data;
      createChart(data, chartId, chartLabel, sliderId, labelId, orderId, dataKey, chartType);

      if (chartType !== 'polarArea') {
        const numBrands = data.length;
        const slider = document.getElementById(sliderId);
        slider.min = 1;
        slider.max = numBrands;
        slider.value = 10;

        const label = document.getElementById(labelId);
        label.textContent = `Jumlah merek yang ditampilkan: 10`;
      }
    })
    .catch(error => console.error('Error:', error));
}

function createChart(data, chartId, chartLabel, sliderId, labelId, orderId, dataKey, chartType) {
  if (chartType === 'horizontalBar') {
    createHorizontalBarChart(data, chartId, chartLabel, sliderId, labelId, orderId, dataKey);
  } else if (chartType === 'polarArea') {
    createDonutChart(data, chartId, chartLabel);
  } else {
    createMixedChart(data, chartId, chartLabel, sliderId, labelId, orderId, dataKey);
  }
}


function createHorizontalBarChart(data, chartId, chartLabel, sliderId, labelId, orderId, dataKey) {
  const sortedData = data.sort((a, b) => b.harga_rata_rata - a.harga_rata_rata);
  const initialData = sortedData.slice(0, 10);

  const labels = initialData.map(item => item.merek);
  const chartData = initialData.map(item => item.harga_rata_rata);

  const ctx = document.getElementById(chartId).getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: chartLabel,
        data: chartData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Harga Rata-Rata'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Merek'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.raw;
              const rating = data.find(item => item.merek === label).rating;
              const customMessage = `Merek: ${label}`;
              const ratingMessage = `Rating: ${rating}`;
              return [customMessage, ratingMessage];
            }
          }
        }
      }
    }
  });

  const filterSlider = document.getElementById(sliderId);
  const filterLabel = document.getElementById(labelId);
  const orderSelect = document.getElementById(orderId);

  function updateData() {
    const numBrands = filterSlider.value;
    const order = orderSelect.value;
    filterLabel.textContent = `Jumlah merek yang ditampilkan: ${numBrands}`;

    const sortedData = order === 'ascending' ?
      allData[dataKey].sort((a, b) => a.harga_rata_rata - b.harga_rata_rata) :
      allData[dataKey].sort((a, b) => b.harga_rata_rata - a.harga_rata_rata);

    const filteredData = sortedData.slice(0, numBrands);
    updateHorizontalBarChart(chart, filteredData);
  }

  filterSlider.addEventListener('input', updateData);
  orderSelect.addEventListener('change', updateData);
}

function updateHorizontalBarChart(chart, data) {
  const labels = data.map(item => item.merek);
  const chartDataHarga = data.map(item => item.harga_rata_rata);

  chart.data.labels = labels;
  chart.data.datasets[0].data = chartDataHarga;
  chart.update();
}

function createMixedChart(data, chartId, chartLabel, sliderId, labelId, orderId, dataKey) {
  const sortedData = data.sort((a, b) => b.harga_rata_rata - a.harga_rata_rata);
  const initialData = sortedData.slice(0, 10);

  const labels = initialData.map(item => item.merek);
  const chartDataHarga = initialData.map(item => item.harga_rata_rata);
  const chartDataTerjual = initialData.map(item => item.terjual);

  const ctx = document.getElementById(chartId).getContext('2d');
  const chart = new Chart(ctx, {
    data: {
      labels: labels,
      datasets: [
        {
          type: 'bar',
          label: 'Harga Rata-Rata',
          data: chartDataHarga,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          yAxisID: 'y-axis-harga'
        },
        {
          type: 'line',
          label: 'Total Terjual',
          data: chartDataTerjual,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          yAxisID: 'y-axis-terjual'
        }
      ]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Merek'
          }
        },
        'y-axis-harga': {
          position: 'left',
          title: {
            display: true,
            text: 'Harga Rata-Rata'
          },
          ticks: {
            beginAtZero: true
          }
        },
        'y-axis-terjual': {
          position: 'right',
          title: {
            display: true,
            text: 'Total Terjual'
          },
          grid: {
            drawOnChartArea: false // Ini akan menghindari tumpang tindih grid antara dua y-axes
          }
        }
      },
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top'
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      }
    }
  });

  const filterSlider = document.getElementById(sliderId);
  const filterLabel = document.getElementById(labelId);
  const orderSelect = document.getElementById(orderId);

  function updateData() {
    const numBrands = filterSlider.value;
    const order = orderSelect.value;
    filterLabel.textContent = `Jumlah merek yang ditampilkan: ${numBrands}`;

    const sortedData = order === 'ascending' ?
      allData[dataKey].sort((a, b) => a.harga_rata_rata - b.harga_rata_rata) :
      allData[dataKey].sort((a, b) => b.harga_rata_rata - a.harga_rata_rata);

    const filteredData = sortedData.slice(0, numBrands);
    updateMixedChart(chart, filteredData);
  }

  filterSlider.addEventListener('input', updateData);
  orderSelect.addEventListener('change', updateData);
}

function updateMixedChart(chart, data) {
  const labels = data.map(item => item.merek);
  const chartDataHarga = data.map(item => item.harga_rata_rata);
  const chartDataTerjual = data.map(item => item.terjual);

  chart.data.labels = labels;
  chart.data.datasets[0].data = chartDataHarga;
  chart.data.datasets[1].data = chartDataTerjual;
  chart.update();
}

function createDonutChart(data, chartId, chartLabel) {
  const labels = Object.keys(data);
  const chartData = Object.values(data);

  const ctx = document.getElementById(chartId).getContext('2d');
  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: chartData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Menonaktifkan rasio aspek default
      aspectRatio: 0.6, // Sesuaikan ini sesuai kebutuhan Anda
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = "Total Terjual" || '';
              const value = context.raw;
              return `${label}: ${value}`;
            }
          }
        }
      }
    }
  });
}




fetchDataAndCreateChart('dataScrap/totalTerjual.json', 'totalTerjual', 'Jumlah Terjual', '', '', '', 'terjual', 'polarArea');


// Fetch data and create charts for all datasets
fetchDataAndCreateChart('dataScrap/headphone_appr.json', 'headphoneChart', 'Harga Rata-Rata Headphone', 'headphoneFilterSlider', 'headphoneFilterLabel', 'headphoneOrderSelect', 'headphone');
fetchDataAndCreateChart('dataScrap/keyboard_appr.json', 'keyboardChart', 'Harga Rata-Rata Keyboard', 'keyboardFilterSlider', 'keyboardFilterLabel', 'keyboardOrderSelect', 'keyboard');
fetchDataAndCreateChart('dataScrap/monitor_appr.json', 'monitorChart', 'Harga Rata-Rata Monitor', 'monitorFilterSlider', 'monitorFilterLabel', 'monitorOrderSelect', 'monitor');
fetchDataAndCreateChart('dataScrap/mouse_appr.json', 'mouseChart', 'Harga Rata-Rata Mouse', 'mouseFilterSlider', 'mouseFilterLabel', 'mouseOrderSelect', 'mouse');
fetchDataAndCreateChart('dataScrap/speaker_appr.json', 'speakerChart', 'Harga Rata-Rata Speaker', 'speakerFilterSlider', 'speakerFilterLabel', 'speakerOrderSelect', 'speaker');
fetchDataAndCreateChart('dataScrap/tas_laptop_appr.json', 'tasLaptopChart', 'Harga Rata-Rata Tas Laptop', 'tasLaptopFilterSlider', 'tasLaptopFilterLabel', 'tasLaptopOrderSelect', 'tas_laptop');
fetchDataAndCreateChart('dataScrap/webcam_appr.json', 'webcamChart', 'Harga Rata-Rata Webcam', 'webcamFilterSlider', 'webcamFilterLabel', 'webcamOrderSelect', 'webcam');
fetchDataAndCreateChart('dataScrap/headphone_appr.json', 'headphoneHorizontalChart', 'Harga Rata-Rata Headphone', 'headphoneFilterSliderHChart', 'headphoneFilterLabelHChart', 'headphoneOrderSelectHChart', 'headphone','horizontalBar');
fetchDataAndCreateChart('dataScrap/keyboard_appr.json', 'keyboardHorizontalChart', 'Harga Rata-Rata Keyboard', 'keyboardFilterSliderHChart', 'keyboardFilterLabelHChart', 'keyboardOrderSelectHChart', 'keyboard','horizontalBar');
fetchDataAndCreateChart('dataScrap/monitor_appr.json', 'monitorHorizontalChart', 'Harga Rata-Rata Monitor', 'monitorFilterSliderHChart', 'monitorFilterLabelHChart', 'monitorOrderSelectHChart', 'monitor','horizontalBar');
fetchDataAndCreateChart('dataScrap/mouse_appr.json', 'mouseHorizontalChart', 'Harga Rata-Rata Mouse', 'mouseFilterSliderHChart', 'mouseFilterLabelHChart', 'mouseOrderSelectHChart', 'mouse','horizontalBar');
fetchDataAndCreateChart('dataScrap/speaker_appr.json', 'speakerHorizontalChart', 'Harga Rata-Rata Speaker', 'speakerFilterSliderHChart', 'speakerFilterLabelHChart', 'speakerOrderSelectHChart', 'speaker','horizontalBar');
fetchDataAndCreateChart('dataScrap/tas_laptop_appr.json', 'tasLaptopHorizontalChart', 'Harga Rata-Rata Tas Laptop', 'tasLaptopFilterSliderHChart', 'tasLaptopFilterLabelHChart', 'tasLaptopOrderSelectHChart', 'tas_laptop','horizontalBar');
fetchDataAndCreateChart('dataScrap/webcam_appr.json', 'webcamHorizontalChart', 'Harga Rata-Rata Webcam', 'webcamFilterSliderHChart', 'webcamFilterLabelHChart', 'webcamOrderSelectHChart', 'webcam','horizontalBar');
