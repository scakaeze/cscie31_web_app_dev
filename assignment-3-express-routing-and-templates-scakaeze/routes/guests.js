var express = require('express');
var router = express.Router();
var app = express();


router.use('/home', function (req, res, next){

  if(req.query.first || req.query.last || req.query.amount){
    app.locals.first = req.query.first;
    app.locals.last = req.query.last;
    app.locals.amount = req.query.amount;
  }
  res.render('homepage');
  console.log("Success on Home Page");
});

router.use('/request', function (req, res, next){
  res.render('request', {
    "first": app.locals.first,
    "last": app.locals.last,
    "amount": app.locals.amount
  });
  console.log("Success on Request Page");
});

router.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('There is an error with this request');
});

router.use(function (req, res, next) {
  res.status(404).send("Page cannot be found!")
});

module.exports = router;
