const config = require('../config/config');
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

function getFromDatabase(keys, params, cb) {
  var qry = "SELECT * FROM pathways_canada_locations"
  if (keys.length != 0) {
    qry += " WHERE "
    for (i in keys) {
      qry += "UPPER(" + keys[i] + ") LIKE UPPER('" + params[keys[i]] + "')"
      if (i != keys.length-1) {
        qry += " AND "
      }
    }
    qry += ";"
  } 
  console.log(qry)
	pool.query(qry, (err, res) => {
    cb(res.rows);
	});
}

function postToDatabase(data) {
  pool.query("", (err, res) => {
    console.log(err, res)
    pool.end()
    return res
  });
}

function getLocations(cb) {
  pool.query("SELECT agency_name FROM public.pathways_canada_locations ORDER BY agency_name ASC", (err, res) => {
    var result = []
    for (i in res.rows) {
      result.push(Object.values(res.rows[i])[0])
    }
    cb(result)
  });
}

module.exports = Object.freeze({
  getFromDatabase,
  postToDatabase,
  getLocations
});

/*
const client = new Client({
  connectionString: config.connectionString,
});

client.connect();

*/
  