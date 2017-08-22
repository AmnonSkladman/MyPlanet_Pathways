const { Pool } = require('pg');
const config = require('../config/config');

const pool = new Pool({
  connectionString: config.connectionString,
});


pool.connect(function(err) {
if (err) throw err;

});

module.exports = pool;


/*
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const client = new Client({
  connectionString: connectionString,
})
client.connect()

client.query(sql, (err, res) => {
  console.log(err, res)
  client.end()
})
*/