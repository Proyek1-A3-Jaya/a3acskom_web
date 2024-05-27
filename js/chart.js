fetch('hargaRerataan.json')
  .then(response => response.json())
  .then(data => {
    createBarChart(data);
  })
  .catch(error => console.error('Error:', error));

fetch('headphone_appr.json')
  .then(response => response.json())
  .then(data => {
    createPieChart(data);
  })
  .catch(error => console.error('Error:', error));

  fetch('keyboard_appr.json')
  .then(response => response.json())
  .then(data => {
    createKeyboardChart(data);
  })
  .catch(error => console.error('Error:', error));

function createBarChart(data) {
  const labels = Object.keys(data);
  const chartData = Object.values(data);

  const ctx = document.getElementById('barChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Harga Mouse',
        data: chartData,
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Harga'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Nama Merk'
          }
        }
      }
    }
  });
}

function createPieChart(data) {
  const labels = [];
  const values = [];

  data.forEach(item => {
    labels.push(item.merek);
    values.push(item.terjual);
  });

  const ctx = document.getElementById('pieChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Terjual',
        data: values,
        // Konfigurasi lainnya untuk pie chart
      }]
    },
    options: {
      // Opsi lainnya untuk pie chart
    }
  });
}

function createKeyboardChart(data) {
  const labels = data.map(item => item.merek);
  const chartData = data.map(item => item.harga_rata_rata);

  const ctx = document.getElementById('keyboardChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Harga Rata-Rata Keyboard',
        data: chartData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Warna latar belakang batang
        borderColor: 'rgba(54, 162, 235, 1)', // Warna border batang
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Memulai sumbu y dari 0
          title: {
            display: true,
            text: 'Harga Rata-Rata'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Merek'
          }
        }
      }
    }
  });
}