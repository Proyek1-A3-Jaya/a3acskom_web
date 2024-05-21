fetch('hargaRerataan.json')
  .then(response => response.json())
  .then(data => {
    createChart(data);
  })
  .catch(error => console.error('Error:', error));

function createChart(data) {
  // Ekstrak label (nama merk) dan data (harga)
  const labels = Object.keys(data);
  const chartData = Object.values(data);

  const ctx = document.getElementById('myChart').getContext('2d');

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
      indexAxis: 'y', // Membuat batang horizontal
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
