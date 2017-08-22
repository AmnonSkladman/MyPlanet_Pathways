const express = require('express')
const { Client } = require('pg')
const bodyParser = require('body-parser')
const db_conn = require('./db/index')
const config = require('./config/config')

const app = express()

const client = new Client({
	connectionString: config.connectionString
})
client.connect()

var qry = "SELECT * FROM toronto_site_oct_2016"
client.query(qry, (err, res) => {
  console.log(err, res)
  console.log("test")
  client.end()
})

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
	client.query('SELECT NOW()', (err, res) => {
	  console.log(err, res)
	  client.end()
	})
	res.status(204).end()
})

app.post('/api/upload', bodyParser.json({}), (req, res, next) => {
	console.log(req.body)
	res.status(204).end()
})


<<<<<<< HEAD
=======
app.get('/:id', (req, res, next) => {
  db_conn.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
    if (err) {
      return next(err)
    }
    res.send(res.rows[0])
  })
})
*/
