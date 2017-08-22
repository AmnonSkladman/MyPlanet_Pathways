const config = require('../config/config');
const { Pool, Client } = require('pg');

const pool = new Pool({
  connectionString: config.connectionString,
});

var test_qry = "SELECT * FROM pathways_canada_locations WHERE city = 'Toronto' AND locationid = 14";
  
pool.query(test_qry, (err, res) => {
  console.log(res.rows)
  pool.end()
});

function getFromDatabase(keys, params) {
	pool.query('SELECT * FROM pathways_canada_members WHERE', (err, res) => {
		console.log(err, res)
		pool.end()
		return res
	});
}

function postToDatabase(data) {
  pool.query('SELECT * FROM pathways_canada_members WHERE', (err, res) => {
    console.log(err, res)
    pool.end()
    return res
  });
}

module.exports = Object.freeze({
  getFromDatabase,
  postToDatabase
});

/*
const client = new Client({
  connectionString: config.connectionString,
});

client.connect();

*/
  