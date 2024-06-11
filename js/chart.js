'use strict';

const approximateHorizontalChartContext = document.getElementById('ApproximateHorizontalChart');
const approximateComparisonChartContext = document.getElementById('approximateComparisonChart');
const approximateSalesChartContext = document.getElementById('approximateSalesChart');

let dataLinks = {
  headphone: 'dataScrap/headphone_appr.json',
  keyboard: 'dataScrap/keyboard_appr.json',
  monitor: 'dataScrap/monitor_appr.json',
  mouse: 'dataScrap/mouse_appr.json',
  speaker: 'dataScrap/speaker_appr.json',
  tas_laptop: 'dataScrap/tas_laptop_appr.json',
  webcam: 'dataScrap/webcam_appr.json',
};

let dataNames = {
  headphone: 'Headphone',
  keyboard: 'Keyboard',
  monitor: 'Monitor',
  mouse: 'Mouse',
  speaker: 'Speaker',
  tas_laptop: 'Tas Laptop',
  webcam: 'Webcam',
}

function formatCurrencyToIDR(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value);
}

async function fetchItemData(itemName) {
  const request = await fetch(dataLinks[itemName]);

  if (request.ok) {
    const data = await request.json();
    return data;
  } else {
    console.error('Error fetching data:', request.status);
    return null;
  }
}

function visualizeTotalTerjual(){
  fetch('dataScrap/totalTerjual.json').then(async result => {
    const data = await result.json();

    const labels = Object.keys(data);
    const chartData = Object.values(data);
  
    const ctx = document.getElementById('totalTerjual');
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
  }).catch(error => {
    console.error('Error fetching data:', error);
  });
}

function visualizeApproximateItem(itemName){
  const sliderLabel = document.getElementById('approximateBrandNumberLabel');
  const slider = document.getElementById('approximateBrandNumber');
  const itemType = document.getElementById('approximateItemType');
  const sortType = document.getElementById('approximateSortType');

  fetchItemData(itemName).then(itemData => {
    let sortedData = itemData.sort((a, b) => b.harga_rata_rata - a.harga_rata_rata);
    const initialData = sortedData.slice(0, 10);

    let currentItem = itemName;
    const labels = initialData.map(item => item.merek);
    const chartData = initialData.map(item => item.harga_rata_rata);

    slider.min = 1;
    slider.value = 10;
    slider.max = sortedData.length;

    const chart = new Chart(approximateHorizontalChartContext, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Harga Rata-Rata ${dataNames[currentItem]}`,
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

                const hargaRataRataMessage = `Harga Rata-Rata: ${formatCurrencyToIDR(value)}`;
                return [hargaRataRataMessage];
              }
            }
          }
        }
      }
    });

    async function updateData() {
      let numBrands = slider.value;
      const order = sortType.value;
      sliderLabel.textContent = `Jumlah merek yang ditampilkan: ${numBrands}`;

      if(currentItem !== itemType.value){
        currentItem = itemType.value;
        await fetchItemData(currentItem).then(newItemData => {
          numBrands = 10;
          slider.value = 10;
          slider.max = newItemData.length;
          
          sortedData = newItemData;
          sliderLabel.textContent = `Jumlah merek yang ditampilkan: 10`;
          })
      } 
          
      sortedData = order === 'ascending' ?
        sortedData.sort((a, b) => a.harga_rata_rata - b.harga_rata_rata) :
        sortedData.sort((a, b) => b.harga_rata_rata - a.harga_rata_rata);
      const slicedData = sortedData.slice(0, numBrands);
          
      const labels = slicedData.map(item => item.merek);
      const chartDataHarga = slicedData.map(item => item.harga_rata_rata);
  
      chart.data.labels = labels;
      chart.data.datasets[0].label = `Harga Rata-Rata ${dataNames[currentItem]}`;
      chart.data.datasets[0].data = chartDataHarga;
      chart.update();
    }
  
    slider.addEventListener('input', updateData);
    sortType.addEventListener('change', updateData);
    itemType.addEventListener('change', updateData);
  });
}

function visualizeTotalSales(itemName){
  const sliderLabel = document.getElementById('approximateSalesBrandNumberLabel');
  const slider = document.getElementById('approximateSalesBrandNumber');
  const itemType = document.getElementById('approximateSalesItemType');
  const sortType = document.getElementById('approximateSalesSortType');

  fetchItemData(itemName).then(itemData => {
    let sortedData =  itemData.sort((a, b) => b.terjual - a.terjual);
    const initialData = sortedData.slice(0, 10);

    let currentItem = itemName;
    const labels = initialData.map(item => item.merek);
    const chartDataTerjual = initialData.map(item => item.terjual);

    slider.min = 1;
    slider.value = 10;
    slider.max = sortedData.length;

    const chart = new Chart(approximateSalesChartContext, {
      data: {
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: 'Total Terjual',
            data: chartDataTerjual,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Terjual'
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
          legend: {
            position: 'top'
          }
        },
      }
    });  

    async function updateData() {
      let numBrands = slider.value;
      const order = sortType.value;
      sliderLabel.textContent = `Jumlah merek yang ditampilkan: ${numBrands}`;
      
      if(currentItem !== itemType.value){
        currentItem = itemType.value;
        await fetchItemData(currentItem).then(newItemData => {
          numBrands = 10;
          slider.value = 10;
          slider.max = newItemData.length;
          sortedData =  newItemData;
          sliderLabel.textContent = `Jumlah merek yang ditampilkan: 10`;
        })
      }

      sortedData = order === 'ascending' ?
        sortedData.sort((a, b) => a.terjual - b.terjual) :
        sortedData.sort((a, b) => b.terjual - a.terjual);
      const slicedData = sortedData.slice(0, numBrands);
      
      const labels = slicedData.map(item => item.merek);
      const chartDataTerjual = slicedData.map(item => item.terjual); 

      chart.data.labels = labels;
      chart.data.datasets[0].data = chartDataTerjual;
      chart.update();
    }
  
    slider.addEventListener('input', updateData);
    sortType.addEventListener('change', updateData);
    itemType.addEventListener('change', updateData);
  });
}

function visualizeApproximateAndTotalSales(itemName){
  const sliderLabel = document.getElementById('approximateComparisonBrandNumberLabel');
  const slider = document.getElementById('approximateComparisonBrandNumber');
  const itemType = document.getElementById('approximateComparisonItemType');
  const sortType = document.getElementById('approximateComparisonSortType');

  fetchItemData(itemName).then(itemData => {
    let sortedData = itemData.sort((a, b) => b.harga_rata_rata - a.harga_rata_rata);
    const initialData = sortedData.slice(0, 10);

    let currentItem = itemName;
    const labels = initialData.map(item => item.merek);
    const chartDataHarga = initialData.map(item => item.harga_rata_rata);
    const chartDataTerjual = initialData.map(item => item.terjual);

    slider.min = 1;
    slider.value = 10;
    slider.max = sortedData.length;

    const chart = new Chart(approximateComparisonChartContext, {
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
            intersect: false,
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value = context.raw;

                const hargaRataRataMessage = `Harga Rata-Rata: ${formatCurrencyToIDR(value)}`;
                const totalTerjual = `Total Terjual: ${itemData.find(item => item.merek === label).terjual}`;
                const rating = itemData.find(item => item.merek === label).rerata_rating;
                
                const ratingMessage = `Rating: ${rating}`;
                return [hargaRataRataMessage, totalTerjual, ratingMessage];
              }
            },
            filter: function (chart) {
              return chart.dataset.type === 'bar';
            }
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

    async function updateData() {
      let numBrands = slider.value;
      const order = sortType.value;
      sliderLabel.textContent = `Jumlah merek yang ditampilkan: ${numBrands}`;
  
      if(currentItem !== itemType.value){
        currentItem = itemType.value;
        await fetchItemData(currentItem).then(newItemData => {
          numBrands = 10;
          slider.value = 10;
          slider.max = newItemData.length;
          sortedData =  newItemData;
          sliderLabel.textContent = `Jumlah merek yang ditampilkan: 10`;
        })  
      }
          
      sortedData = order === 'ascending' ?
        sortedData.sort((a, b) => a.harga_rata_rata - b.harga_rata_rata) :
        sortedData.sort((a, b) => b.harga_rata_rata - a.harga_rata_rata);
      const slicedData = sortedData.slice(0, numBrands);

      const labels = slicedData.map(item => item.merek);
      const chartDataHarga = slicedData.map(item => item.harga_rata_rata);
      const chartDataTerjual = slicedData.map(item => item.terjual); 

      chart.data.labels = labels;
      chart.data.datasets[0].data = chartDataHarga;
      chart.data.datasets[1].data = chartDataTerjual;
      chart.update();
    }
  
    slider.addEventListener('input', updateData);
    sortType.addEventListener('change', updateData);
    itemType.addEventListener('change', updateData);
  });
}

visualizeTotalTerjual();
visualizeApproximateItem('headphone');
visualizeTotalSales('headphone');
visualizeApproximateAndTotalSales('headphone');