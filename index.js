const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const { Client } = require('pg')

const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})
const server = app.listen(3000, () => {
	console.log("listening on port 3000")
})

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/static/index.html')
})