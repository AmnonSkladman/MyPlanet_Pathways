const config = require('../config/config_dev');
const { Pool, Client } = require('pg');

const pool = new Pool({
  connectionString: config.connectionString,
});

/*
var test_qry = "SELECT * FROM pathways_canada_locations WHERE city = 'Toronto' AND locationid = 14";
  
pool.query(test_qry, (err, res) => {
  console.log(res)
  pool.end()
});
*/

function getFromDatabase(keys, params) {
  var qry = ""
  if (keys.length == 0) {
    qry = "SELECT * FROM pathways_canada_locations"
  } else {

  }
	pool.query(qry, (err, res) => {
		return res.rows
	});
}

function postToDatabase(data) {
  pool.query("", (err, res) => {
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
  