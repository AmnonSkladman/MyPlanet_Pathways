const express = require('express');
const router = express.Router();
const config = require('./config/config');
const db_conn = require('./db/index');

//define routes

router.get('/', function (req, res) {
  res.render('index');
});

router.post('/api/upload', (req, res) => {
  var dataList = req.body.data.map(sheet => {
    var newSheet = XLSX.utils.sheet_to_json(Object.values(XLSX.read(sheet.content.split(',')[1], {
      type: 'base64'
    }).Sheets)[0])
    return newSheet.map(item => {
      item.location = sheet.name.split("_")[0]
      console.log(item.location)
      item.date = sheet.name.split("_")[2] + " " + sheet.name.split("_")[3]
      return item
    })
  })
  var result = ""
  for (i in dataList) {
    result += JSON.stringify(dataList[i])
  }
  console.log(dataList)
  res.status(204).end();
})

router.get('/api', (req, res, next) => {
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

module.exports = router;