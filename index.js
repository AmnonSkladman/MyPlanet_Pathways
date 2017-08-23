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

//sends the main homepage
app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/static/index.html')
})

//user uploads excel files
app.post('/api/upload', (req, res) => {
  //receives files in an array of base64 data and file name object
  var dataList = req.body.data.map(sheet => {
    //converts base64 data into json
    var newSheet = XLSX.utils.sheet_to_json(Object.values(XLSX.read(sheet.content.split(',')[1], {type: 'base64'}).Sheets)[0])
    return newSheet.map(item => {
      //parses file name and adds information into row objects
      item.location = sheet.name.split("_")[0]
      item.date = sheet.name.split("_")[2] + " " + sheet.name.split("_")[3]
      return item
    })
  })
  var result = ""
  for (i in dataList) {
    //converts dataList in string
    result += JSON.stringify(dataList[i])
  }
  console.log(dataList)
  res.end()
})

//api for getting data from database
app.get('/api', (req, res, next) => {
	const params = req.query;
	var keys = []
 	Object.keys(params).forEach((i) => {
 		keys.push(i)
 	})
  //gets data from database based on the user's query
  db_conn.getFromDatabase(keys, params, (result) => {
    console.log(result)
    res.send(result)
  });
})


