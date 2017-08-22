const express = require('express');
const { Client } = require('pg');
const app = express();
const bodyParser = require('body-parser');
const db_conn = require('./db/index');
const config = require('./config/config');

const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/static/index.html')
})

app.post('/api/upload', (req, res, next) => {
	console.log(req)
})

app.get('/api', (req, res, next) => {
	const params = req.query;
	var keys = []

   	Object.keys(params).forEach((i) => {
   		keys.push(i)
   	})
   	console.log(keys)
   	db_conn.sendToDatabase(keys, params)

   	res.end()
})