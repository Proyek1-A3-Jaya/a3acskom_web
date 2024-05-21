fetch('mouse.json')
  .then(response => response.json())
  .then(data => {
    createChart(data);
  })
  .catch(error => console.error('Error:', error));

function createChart(data) {
  const labels = data.map(item => item.merek);
  const chartData = data.map(item => item.harga);

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Harga Mouse',
        data: chartData,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}