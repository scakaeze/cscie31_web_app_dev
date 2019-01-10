var express = require('express');
var guests = require('./routes/guests');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use('/guests', guests);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('There is an error with this request');
});

app.use(function (req, res, next) {
  res.status(404).send("Page cannot be found!")
});

module.exports = app;
