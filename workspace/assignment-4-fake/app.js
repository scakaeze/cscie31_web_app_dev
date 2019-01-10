var express = require('express');
var posts = require('./routes/posts');
var apiposts = require('./routes/api/api-posts');
var path = require('path');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();


var app = express();


mongoose.connect('mongodb://'+ process.env.DB_USER + ':'+process.env.DB_PASS+'@cluster0-shard-00-00-fg15e.mongodb.net:27017,cluster0-shard-00-01-fg15e.mongodb.net:27017,cluster0-shard-00-02-fg15e.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/posts', posts);
app.use('/api/posts', apiposts);

app.use(function (err, req, res, next) {
  console.log(err.message);
  console.error(err.stack);
  res.status(500).send('There is an error with this request');
});

app.use(function (req, res, next) {
  res.status(404).send("Page cannot be found!")
});

module.exports = app;
