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
/*
app.get('/api/:id&:name', (req, res, next) => {
	const data = req.params.name
	console.log(data)
	res.status(204).end()
})


app.get('/:id', (req, res, next) => {
  db_conn.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
    if (err) {
      return next(err)
    }
    res.send(res.rows[0])
  })
})
*/