const express = require('express');
<<<<<<< HEAD
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config');
const XLSX = require('xlsx');
const path = require('path');

//configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

//use middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require('./routes'));
const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
=======
const { Client } = require('pg');
const app = express();
const bodyParser = require('body-parser');
const db_conn = require('db/index');
const config = require('config/config');
const XLSX = require('xlsx');


const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

app.use(bodyParser.urlencoded({
    extended: true
}));

 app.get('/', (req, res, next) => {
 
	res.sendFile(__dirname + 'static/index.html')
}); 

app.post('/api/upload', (req, res) => {
  var dataList = req.body.data.map(sheet => {
    var newSheet = XLSX.utils.sheet_to_json(Object.values(XLSX.read(sheet.content.split(',')[1], {type: 'base64'}).Sheets)[0])
    return newSheet.map(item => {
      item.location = sheet.name.split("_")[0]
      console.log(item.location)
      item.date = sheet.name.split("_")[2] + " " + sheet.name.split("_")[3];
      return item;
    })
  })
  var result = ""
  for (i in dataList) {
    result += JSON.stringify(dataList[i])
  }
  console.log(dataList)
  res.end()
})

app.get('/api', (req, res, next) => {
	const params = req.query;
	var keys = []
 	Object.keys(params).forEach((i) => {
 		keys.push(i)
 	})
  db_conn.getFromDatabase(keys, params, (result) => {
    console.log(result)
    res.send(result)
  });
})

>>>>>>> c52c4d022986fc35480129d3aca4fbaba28a78ef
