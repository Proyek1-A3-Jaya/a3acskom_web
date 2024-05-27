let allData = {};

function fetchDataAndCreateChart(url, chartId, chartLabel, sliderId, labelId, orderId, dataKey) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      allData[dataKey] = data;
      createChart(data, chartId, chartLabel, sliderId, labelId, orderId, dataKey);

      const numBrands = data.length;
      const slider = document.getElementById(sliderId);
      slider.min = 1;
      slider.max = numBrands;
      slider.value = 10;
      
      const label = document.getElementById(labelId);
      label.textContent = `Jumlah merek yang ditampilkan: 10`;
    })
    .catch(error => console.error('Error:', error));
}

function createChart(data, chartId, chartLabel, sliderId, labelId, orderId, dataKey) {
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
    updateChart(chart, filteredData);
  }

  filterSlider.addEventListener('input', updateData);
  orderSelect.addEventListener('change', updateData);
}

function updateChart(chart, data) {
  const labels = data.map(item => item.merek);
  const chartData = data.map(item => item.harga_rata_rata);

  chart.data.labels = labels;
  chart.data.datasets[0].data = chartData;
  chart.update();
}

// Fetch data and create charts for all datasets
fetchDataAndCreateChart('dataScrap/headphone_appr.json', 'headphoneChart', 'Harga Rata-Rata Headphone', 'headphoneFilterSlider', 'headphoneFilterLabel', 'headphoneOrderSelect', 'headphone');
fetchDataAndCreateChart('dataScrap/keyboard_appr.json', 'keyboardChart', 'Harga Rata-Rata Keyboard', 'keyboardFilterSlider', 'keyboardFilterLabel', 'keyboardOrderSelect', 'keyboard');
fetchDataAndCreateChart('dataScrap/monitor_appr.json', 'monitorChart', 'Harga Rata-Rata Monitor', 'monitorFilterSlider', 'monitorFilterLabel', 'monitorOrderSelect', 'monitor');
fetchDataAndCreateChart('dataScrap/mouse_appr.json', 'mouseChart', 'Harga Rata-Rata Mouse', 'mouseFilterSlider', 'mouseFilterLabel', 'mouseOrderSelect', 'mouse');
fetchDataAndCreateChart('dataScrap/speaker_appr.json', 'speakerChart', 'Harga Rata-Rata Speaker', 'speakerFilterSlider', 'speakerFilterLabel', 'speakerOrderSelect', 'speaker');
fetchDataAndCreateChart('dataScrap/tas_laptop_appr.json', 'tasLaptopChart', 'Harga Rata-Rata Tas Laptop', 'tasLaptopFilterSlider', 'tasLaptopFilterLabel', 'tasLaptopOrderSelect', 'tas_laptop');
fetchDataAndCreateChart('dataScrap/webcam_appr.json', 'webcamChart', 'Harga Rata-Rata Webcam', 'webcamFilterSlider', 'webcamFilterLabel', 'webcamOrderSelect', 'webcam');
