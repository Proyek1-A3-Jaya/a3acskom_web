const fs = require('fs');

// data JSON hasil cleansing
const cleanedData = [
  {
    "merek": "Logitech",
    "harga": 110000
  },
  {
    "merek": "Logitech",
    "harga": 179000
  },
  {
    "merek": "iClever",
    "harga": 329000
  },
  {
    "merek": "Lenovo",
    "harga": 13500
  },
  {
    "merek": "Robot",
    "harga": 99000
  },
  {
    "merek": "Logitech",
    "harga": 50000
  },
  {
    "merek": "Lainnya",
    "harga": 125000
  },
  {
    "merek": "JOYSEUS",
    "harga": 84900
  },
  {
    "merek": "Logitech",
    "harga": 48600
  },
  {
    "merek": "Lainnya",
    "harga": 9300
  },
  {
    "merek": "Genius",
    "harga": 115000
  },
  {
    "merek": "Logitech",
    "harga": 110000
  },
  {
    "merek": "Logitech",
    "harga": 1499000
  },
  {
    "merek": "Apple",
    "harga": 1094000
  },
  {
    "merek": "Logitech",
    "harga": 815000
  },
  {
    "merek": "Robot",
    "harga": 45000
  },
  {
    "merek": "Lainnya",
    "harga": 30000
  },
  {
    "merek": "Logitech",
    "harga": 113700
  },
  {
    "merek": "Robot",
    "harga": 45000
  },
  {
    "merek": "Logitech",
    "harga": 210000
  },
  {
    "merek": "Logitech",
    "harga": 49900
  },
  {
    "merek": "Lenovo",
    "harga": 13500
  },
  {
    "merek": "M-Tech",
    "harga": 10000
  },
  {
    "merek": "Lainnya",
    "harga": 49000
  },
  {
    "merek": "Lainnya",
    "harga": 69900
  },
  {
    "merek": "Lainnya",
    "harga": 205000
  },
  {
    "merek": "HP",
    "harga": 47500
  },
  {
    "merek": "NYK",
    "harga": 115000
  },
  {
    "merek": "Logitech",
    "harga": 839000
  },
  {
    "merek": "Genius",
    "harga": 119000
  },
  {
    "merek": "Logitech",
    "harga": 110000
  },
  {
    "merek": "Lainnya",
    "harga": 16000
  },
  {
    "merek": "Logitech",
    "harga": 71250
  },
  {
    "merek": "Logitech",
    "harga": 50400
  },
  {
    "merek": "Lainnya",
    "harga": 19900
  },
  {
    "merek": "Logitech",
    "harga": 397000
  },
  {
    "merek": "Lainnya",
    "harga": 59000
  },
  {
    "merek": "Unitech",
    "harga": 12500
  },
  {
    "merek": "Logitech",
    "harga": 181000
  },
  {
    "merek": "Lainnya",
    "harga": 52500
  },
  {
    "merek": "Lainnya",
    "harga": 12000
  },
  {
    "merek": "Cooler Master",
    "harga": 447000
  },
  {
    "merek": "iClever",
    "harga": 389000
  },
  {
    "merek": "Logitech",
    "harga": 401000
  },
  {
    "merek": "Logitech",
    "harga": 415000
  },
  {
    "merek": "Logitech",
    "harga": 55250
  },
  {
    "merek": "Lainnya",
    "harga": 3790
  },
  {
    "merek": "Logitech",
    "harga": 115000
  },
  {
    "merek": "Lainnya",
    "harga": 47900
  },
  {
    "merek": "Logitech",
    "harga": 50200
  },
  {
    "merek": "Lainnya",
    "harga": 55000
  },
  {
    "merek": "Genius",
    "harga": 45000
  },
  {
    "merek": "Lenovo",
    "harga": 129000
  },
  {
    "merek": "NYK",
    "harga": 135000
  },
  {
    "merek": "Lainnya",
    "harga": 20000
  },
  {
    "merek": "Lainnya",
    "harga": 44300
  },
  {
    "merek": "Unitech",
    "harga": 13500
  },
  {
    "merek": "Logitech",
    "harga": 58000
  },
  {
    "merek": "Unitech",
    "harga": 10900
  },
  {
    "merek": "Robot",
    "harga": 57000
  },
  {
    "merek": "Genius",
    "harga": 22900
  },
  {
    "merek": "Lainnya",
    "harga": 30000
  },
  {
    "merek": "Lainnya",
    "harga": 78000
  },
  {
    "merek": "Logitech",
    "harga": 194000
  },
  {
    "merek": "Logitech",
    "harga": 50500
  },
  {
    "merek": "HP",
    "harga": 39000
  },
  {
    "merek": "Logitech",
    "harga": 179000
  },
  {
    "merek": "HP",
    "harga": 39900
  },
  {
    "merek": "Lainnya",
    "harga": 59900
  },
  {
    "merek": "HP",
    "harga": 45600
  },
  {
    "merek": "Apple",
    "harga": 1086000
  },
  {
    "merek": "Lainnya",
    "harga": 45000
  },
  {
    "merek": "Apple",
    "harga": 1099000
  },
  {
    "merek": "Lainnya",
    "harga": 30000
  },
  {
    "merek": "Logitech",
    "harga": 179000
  },
  {
    "merek": "Robot",
    "harga": 22500
  },
  {
    "merek": "Lenovo",
    "harga": 22000
  },
  {
    "merek": "Lainnya",
    "harga": 39900
  },
  {
    "merek": "HP",
    "harga": 44976
  },
  {
    "merek": "Lainnya",
    "harga": 4450
  },
  {
    "merek": "Rexus",
    "harga": 45590
  },
  {
    "merek": "Microsoft",
    "harga": 1449000
  },
  {
    "merek": "Logitech",
    "harga": 63000
  },
  {
    "merek": "Logitech",
    "harga": 71250
  },
  {
    "merek": "Lainnya",
    "harga": 49900
  },
  {
    "merek": "Logitech",
    "harga": 45000
  },
  {
    "merek": "Dell",
    "harga": 47000
  },
  {
    "merek": "Logitech",
    "harga": 47500
  },
  {
    "merek": "Robot",
    "harga": 19900
  },
  {
    "merek": "Dell",
    "harga": 19500
  },
  {
    "merek": "Lainnya",
    "harga": 49000
  },
  {
    "merek": "Unitech",
    "harga": 69000
  },
  {
    "merek": "M-Tech",
    "harga": 36000
  },
  {
    "merek": "Lainnya",
    "harga": 49000
  },
  {
    "merek": "Lainnya",
    "harga": 214000
  },
  {
    "merek": "Lainnya",
    "harga": 9300
  },
  {
    "merek": "Apple",
    "harga": 1099000
  },
  {
    "merek": "iClever",
    "harga": 229000
  },
  {
    "merek": "Logitech",
    "harga": 993000
  },
  {
    "merek": "Robot",
    "harga": 28400
  },
  {
    "merek": "Logitech",
    "harga": 386000
  },
  {
    "merek": "Lenovo",
    "harga": 799000
  },
  {
    "merek": "Robot",
    "harga": 21000
  },
  {
    "merek": "Lainnya",
    "harga": 5500
  },
  {
    "merek": "Unitech",
    "harga": 15000
  },
  {
    "merek": "Lainnya",
    "harga": 1625000
  },
  {
    "merek": "Lainnya",
    "harga": 10000
  },
  {
    "merek": "Unitech",
    "harga": 12900
  },
  {
    "merek": "Lainnya",
    "harga": 80000
  },
  {
    "merek": "Robot",
    "harga": 37000
  },
  {
    "merek": "Lainnya",
    "harga": 137000
  },
  {
    "merek": "Lenovo",
    "harga": 299000
  },
  {
    "merek": "Lainnya",
    "harga": 15000
  },
  {
    "merek": "Logitech",
    "harga": 671000
  },
  {
    "merek": "Lainnya",
    "harga": 300000
  },
  {
    "merek": "Lainnya",
    "harga": 5000
  },
  {
    "merek": "Robot",
    "harga": 21600
  },
  {
    "merek": "JOYSEUS",
    "harga": 74900
  },
  {
    "merek": "HP",
    "harga": 25000
  },
  {
    "merek": "Logitech",
    "harga": 139000
  },
  {
    "merek": "Lainnya",
    "harga": 89000
  },
  {
    "merek": "Lainnya",
    "harga": 180000
  },
  {
    "merek": "Lainnya",
    "harga": 10000
  },
  {
    "merek": "Logitech",
    "harga": 73000
  },
  {
    "merek": "Lainnya",
    "harga": 13000
  },
  {
    "merek": "Logitech",
    "harga": 132000
  },
  {
    "merek": "Logitech",
    "harga": 255000
  },
  {
    "merek": "Rexus",
    "harga": 145000
  },
  {
    "merek": "Lainnya",
    "harga": 13500
  },
  {
    "merek": "Lainnya",
    "harga": 199000
  },
  {
    "merek": "Robot",
    "harga": 52900
  },
  {
    "merek": "Lainnya",
    "harga": 59000
  },
  {
    "merek": "Lainnya",
    "harga": 53800
  },
  {
    "merek": "Lainnya",
    "harga": 129900
  },
  {
    "merek": "HP",
    "harga": 18000
  },
  {
    "merek": "Logitech",
    "harga": 50700
  },
  {
    "merek": "Lainnya",
    "harga": 29500
  },
  {
    "merek": "Lenovo",
    "harga": 499000
  },
  {
    "merek": "Logitech",
    "harga": 48600
  },
  {
    "merek": "Lainnya",
    "harga": 29800
  },
  {
    "merek": "Dell",
    "harga": 189000
  },
  {
    "merek": "Lainnya",
    "harga": 27000
  },
  {
    "merek": "Lainnya",
    "harga": 86300
  },
  {
    "merek": "Lainnya",
    "harga": 202500
  },
  {
    "merek": "Lainnya",
    "harga": 59000
  },
  {
    "merek": "Apple",
    "harga": 1086000
  },
  {
    "merek": "Logitech",
    "harga": 110000
  },
  {
    "merek": "Dell",
    "harga": 149000
  },
  {
    "merek": "NYK",
    "harga": 108999
  },
  {
    "merek": "Lainnya",
    "harga": 399000
  },
  {
    "merek": "HP",
    "harga": 59000
  },
  {
    "merek": "Rexus",
    "harga": 74500
  },
  {
    "merek": "Lainnya",
    "harga": 30000
  },
  {
    "merek": "Robot",
    "harga": 59000
  },
  {
    "merek": "NYK",
    "harga": 61000
  },
  {
    "merek": "Lainnya",
    "harga": 15000
  },
  {
    "merek": "Lainnya",
    "harga": 27000
  },
  {
    "merek": "Lainnya",
    "harga": 26900
  },
  {
    "merek": "Lainnya",
    "harga": 99900
  },
  {
    "merek": "Lainnya",
    "harga": 86300
  },
  {
    "merek": "Logitech",
    "harga": 104000
  },
  {
    "merek": "Robot",
    "harga": 21000
  },
  {
    "merek": "Lainnya",
    "harga": 49000
  },
  {
    "merek": "HP",
    "harga": 48000
  },
  {
    "merek": "Apple",
    "harga": 20000
  },
  {
    "merek": "Logitech",
    "harga": 58500
  },
  {
    "merek": "Logitech",
    "harga": 421000
  },
  {
    "merek": "Lainnya",
    "harga": 135000
  },
  {
    "merek": "Logitech",
    "harga": 71250
  },
  {
    "merek": "Robot",
    "harga": 59000
  }
]

// Mengelompokkan data berdasarkan merk
const groupedData = cleanedData.reduce((acc, curr) => {
  if (!acc[curr.merek]) {
    acc[curr.merek] = [];
  }
  acc[curr.merek].push(curr.harga);
  return acc;
}, {});

// Menghitung harga rata-rata untuk setiap merk
const averagehargas = {};
for (const merek in groupedData) {
  const hargas = groupedData[merek];
  const averageharga = hargas.reduce((total, harga) => total + harga, 0) / hargas.length;
  averagehargas[merek] = averageharga;
}

// Menyimpan hasil ke dalam file JSON baru
fs.writeFileSync('hargaRerataan.json', JSON.stringify(averagehargas, null, 2));

console.log('Harga rata-rata berhasil disimpan ke dalam file hargaRerataan.json');