const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config');
const XLSX = require('xlsx');
const path = require('path');

//configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

//use middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require('./routes'));
const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
