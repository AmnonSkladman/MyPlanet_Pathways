const express = require('express');
const { Client } = require('pg');
const app = express();
const bodyParser = require('body-parser');
const db_conn = require('./db/index');
const config = require('./config/config');
const XLSX = require('xlsx');

const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/static/index.html')
})

app.post('/api/upload', (req, res) => {
  var dataList = req.body.data.map(sheet => {
    var newSheet = XLSX.utils.sheet_to_json(XLSX.read(sheet.content.split(',')[1], {type: 'base64'}).Sheets.Sheet1)
    return newSheet.map(item => {
      item.location = sheet.name.split("_")[0]
      item.date = sheet.name.split("_")[2] + " " + sheet.name.split("_")[3]
      console.log(typeof item.university)
      return item
    })
  })
  console.log(dataList)
  res.end()
})

app.get('/api', (req, res, next) => {
	const params = req.query;
	var keys = []
 	Object.keys(params).forEach((i) => {
 		keys.push(i)
 	})
 	console.log(keys)
 	db_conn.getFromDatabase(keys, params)

 	res.end()
})

app.get('/api/all', (req, res, next) => {

})