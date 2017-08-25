var vcapServices = require('./vcapServices');
var mongoCredentials = vcapServices.postgresql[0].credentials;
var credentialsURI = mongoCredentials.uri;

console.log(credentialsURI);

const config = require('../config/config');
const { Client } = require('pg');



var test_qry = "SELECT * FROM pathways_canada_locations WHERE city = 'Toronto' AND locationid = 14";
  


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

module.exports = Object.freeze({
  getFromDatabase,
  postToDatabase
});


const client = new Client({
  connectionString: credentialsURI,
});

client.connect();

client.query(test_qry, (err, res) => {
  console.log(res)
  client.end()
});
