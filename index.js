const express = require('express')

const bodyParser = require('body-parser')

const { Client } = require('pg')
const connectionString = 'postgres://derekc:derekc2017?!@sl-us-south-1-portal.2.dblayer.com:20238/compose'

const app = express()

const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})
client.connect()

var qry = "SELECT * FROM toronto_site_oct_2016"
client.query(qry, (err, res) => {
  console.log(err, res)
  console.log("test")
  client.end()
})

const server = app.listen(3000, () => {
	console.log("listening on port 3000")
})

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/static/index.html')
})

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


