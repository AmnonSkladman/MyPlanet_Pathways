const config = require('../config/config');
const vcapServices = require('./vcapServices');
const { Client } = require('pg');
var psglCredentials = vcapServices.postgresql[0].credentials;
var credentialsURI = psglCredentials.uri;


const client = new Client({
  connectionString: credentialsURI,
});

client.connect();

function buildSelectQuery(tableName) {
  return ['SELECT * FROM', tableName].join(' ');
}

function selectAll(tableName) {
  return function(onSelectReturn) {
    var sql = buildSelectQuery(tableName);
    var queryClient = buildQueryClient(sql);
    queryClient(function(err, tableValues) {
      if (err) {
        return onSelectReturn(new Error(['Select all failed on', tableName, 'with error', err.toString()].join(' ')));
      } else {
        return onSelectReturn(null, tableValues);
      }
    });
  }
}

function buildQueryClient(query) {
  return function(onQueryReturn) {
    connectWithConnectionString(function(err, client, done) {
      if (err) {
        return onQueryReturn(new Error(['Database connection failed with error', err.toString()].join(' ')));
      } else {
        client.query(query, function(err, results) {
          done(err);
          onQueryReturn(err, results);
        });
      }
    });
  }
}

var test_qry = "SELECT * FROM pathways_canada_locations WHERE city = 'Toronto' AND locationid = 14";

function getFromDatabase(keys, params, cb) {
  var qry = "SELECT * FROM public.pathways_canada_locations"
  if (keys.length != 0) {
    qry += " WHERE "
    for (i in keys) {
      qry += "UPPER(" + keys[i] + ") LIKE UPPER('" + params[keys[i]] + "')"
      if (i != keys.length - 1) {
        qry += " AND "
      }
    }
    qry += ";"
  }
  console.log(qry)
  client.query(qry, (err, res) => {
    cb(res.rows);
  });
}

function postToDatabase(data) {
  var qry = "INSERT INTO public.toronto_site_oct_2016(p2eid, cohort, graduated, year_graduated, ossd, post_secondary_application_status, applied_to_univeristy, applied_to_college, applied_to_both, applied_to_apprenticeship, returning_to_high_school, post_secondary_studentid, program_start_time, applied_to_osap) VALUES "
  var qry = ""
  data.map(sheet => {
    sheet.map(item => {
      qry += "(" + check(item['P2E#']) + ", " + check(item['Cohort']) + ", " + check(item['Graduated (Y/N)']) + ")," + ", " + parseInt(check(item['Year student graduated'])) + ", " + check(item['OSSD']) + ", " + check(item['Did student apply to P/S? (Y/N)']) + ", " + check(item['Applied to University? (Y/N)']) + ", " + check(item['Applied to College? (Y/N)']) + ", " + check(item['Applied to Both? (Y/N)']) + ", " + check(item['Applied to Apprenticeship program? (Y/N)**']) + ", " + check(item['Returning to High School in Fall  (Y/N)']) + ", " + check(item['Post Secondary Student #']) + ", " + check(item['program starting time']) + ", " + check(item['Applied for OSAP? (Y/N)']) + "),"
    })
  })
  qry = qry.slice(0, -1);
  qry += ";"

  client.query("INSERT INTO public.toronto_site_oct_2016(p2eid, cohort, graduated) VALUES ('P12161', 'twelve', 'y');", (err, res, cb) => {
    console.log(err, res)
  });
}

function check(item) {
  if (item != '') {
    return item
  } else {
    return undefined
  }
}

var agency_names_qry = 'SELECT agency_name FROM public.pathways_canada_locations ORDER BY agency_name ASC';

function getLocations(){
  client.query(agency_names_qry, (err, res, cb) => {
   // console.log(err, res.rows)
    var loc = res;
    return loc;
  });

}


module.exports = Object.freeze({
  getFromDatabase,
  postToDatabase,
  getLocations,
  buildQueryClient,
  buildQueryClient,
  selectAll
});