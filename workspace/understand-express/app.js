var express = require('express');
var guests = require('./routes/guests');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname,'views')); 
app.set('view engine', 'pug');

app.use('/guests', guests);

module.exports = app;
