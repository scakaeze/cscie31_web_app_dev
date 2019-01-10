var express = require('express');
var router = express.Router();
var app = express();


router.get('/will', function (req, res, next){

    var bolt = 50;
    app.locals.property = bolt;

    res.render('user', {
      "username": "Stephen Akaeze",
      photo:[
        {title:"My 1st photos", description: "All about my 1st photo"},
        {title:"My 2nd photos", description: "All about my 2nd photo"},
        {title:"My 3rd photos", description: "All about my 3rd photo"}
      ],
      "bell": app.locals.property

  });

  console.log("Rendering input value is " +  app.locals.property);
});


router.get('/result', function (req, res, next){
  var bolt = 76;
  app.locals.property = bolt;

    res.render('trial', {
      "bell": app.locals.property
  });

  console.log("Rendering result is " +  app.locals.property);
});




router.get('/:userid', function (req, res, next){
    res.render('user', {"username": req.param('userid')});
});

router.get('/:userid/profile', function(req, res, next){
    res.end("/users/profile requested");
});

router.use((req, res, next)=>{
  res.end("Page not found like you beans");
});


// then at the bottom of our file, export the router object
module.exports = router;
