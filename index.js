const express = require('express');
const { Client } = require('pg');
const app     = express();
const bodyParser = require('body-parser');
const db_conn = require('./db/index');
const config = require('./config/config');


const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});


app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/static/index.html')
})