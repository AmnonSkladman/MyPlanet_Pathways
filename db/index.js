const config = require('../config/config_dev');
const { Pool, Client } = require('pg');

const pool = new Pool({
    connectionString: config.connectionString,
  });

var test_qry = "SELECT * FROM toronto_site_oct_2016";
  
  pool.query(test_qry, (err, res) => {
    console.log(err, res)
    pool.end()
  });
  
  const client = new Client({
    connectionString: config.connectionString,
  });

  client.connect();
  