var express = require('express');
var router = express.Router();
var app = express();




router.get('/home', function (req, res, next){
  if (req.query){
    console.log("I received the values");
    app.locals.first = req.query.first;
    app.locals.last = req.query.last;
    app.locals.number = req.query.number;
  }

  res.render('homepage');
  console.log("Success on Home Page");
});

router.get('/request', function (req, res, next){
  res.render('request');
  console.log("Success on Request Page");
  console.log("Number of Eggs ordered are " + app.locals.number);
});

router.get('/', function (req, res, next){
  res.end('Sorry!!!!Page is not found');
});

module.exports = router;
