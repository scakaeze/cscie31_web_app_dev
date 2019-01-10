var express = require('express');
var users = require('./routes/users');
var path = require('path');

var app = express();

app.set('views', path.join(__dirname,'views'));    // tells express where to find the views
app.set('view engine', 'pug');  // tells express to use pug as the template engine

app.use('/users', users);

module.exports = app;
