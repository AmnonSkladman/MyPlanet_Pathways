const express = require('express')
const app = express()
const bodyParser = require('body-parser')


console.log("hello world")

const server = app.listen(3000, () => {
	console.log("listening on port 3000")
})

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/static/index.html')
})