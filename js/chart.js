let allData = {};

function fetchDataAndCreateChart(url, chartId, chartLabel, sliderId, labelId, dataKey) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      allData[dataKey] = data; // Menyimpan data pada objek allData dengan key yang sesuai
      createChart(data, chartId, chartLabel, sliderId, labelId, dataKey);

      // Mengatur nilai min, max, dan value slider sesuai dengan jumlah merek dalam data
      const numBrands = data.length;
      const slider = document.getElementById(sliderId);
      slider.min = 1;
      slider.max = numBrands;
      slider.value = 10; // Set nilai awal slider ke 10
      
      // Mengatur label slider sesuai dengan nilai awal slider
      const label = document.getElementById(labelId);
      label.textContent = `Jumlah merek yang ditampilkan: 10`;
    })
    .catch(error => console.error('Error:', error));
}

function createChart(data, chartId, chartLabel, sliderId, labelId, dataKey) {
  const sortedData = data.sort((a, b) => b.harga_rata_rata - a.harga_rata_rata);
  const initialData = sortedData.slice(0, 10); // Menampilkan hanya 10 merek pertama

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
      indexAxis: 'y', // Mengubah chart menjadi horizontal
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

  filterSlider.addEventListener('input', function() {
    const numBrands = this.value;
    filterLabel.textContent = `Jumlah merek yang ditampilkan: ${numBrands}`;
    const filteredData = sortedData.slice(0, numBrands);
    updateChart(chart, filteredData);
  });
}

function updateChart(chart, data) {
  const labels = data.map(item => item.merek);
  const chartData = data.map(item => item.harga_rata_rata);

  chart.data.labels = labels;
  chart.data.datasets[0].data = chartData;
  chart.update();
}

// Fetch data and create charts for all datasets
fetchDataAndCreateChart('dataScrap/headphone_appr.json', 'headphoneChart', 'Harga Rata-Rata Headphone', 'headphoneFilterSlider', 'headphoneFilterLabel', 'headphone');
fetchDataAndCreateChart('dataScrap/keyboard_appr.json', 'keyboardChart', 'Harga Rata-Rata Keyboard', 'keyboardFilterSlider', 'keyboardFilterLabel', 'keyboard');
fetchDataAndCreateChart('dataScrap/monitor_appr.json', 'monitorChart', 'Harga Rata-Rata Monitor', 'monitorFilterSlider', 'monitorFilterLabel', 'monitor');
fetchDataAndCreateChart('dataScrap/mouse_appr.json', 'mouseChart', 'Harga Rata-Rata Mouse', 'mouseFilterSlider', 'mouseFilterLabel', 'mouse');
fetchDataAndCreateChart('dataScrap/speaker_appr.json', 'speakerChart', 'Harga Rata-Rata Speaker', 'speakerFilterSlider', 'speakerFilterLabel', 'speaker');
fetchDataAndCreateChart('dataScrap/tas_laptop_appr.json', 'tasLaptopChart', 'Harga Rata-Rata Tas Laptop', 'tasLaptopFilterSlider', 'tasLaptopFilterLabel', 'tas_laptop');
fetchDataAndCreateChart('dataScrap/webcam_appr.json', 'webcamChart', 'Harga Rata-Rata Webcam', 'webcamFilterSlider', 'webcamFilterLabel', 'webcam');
