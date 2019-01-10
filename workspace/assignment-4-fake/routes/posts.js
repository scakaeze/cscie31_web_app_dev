var express = require('express');
var router = express.Router();
var postmodel = require('../models/postmodel');
var app = express();

// function to generate time string at any moment
function getDate(){
  var d = new Date();
  var date = (d.toLocaleDateString() + " @ " + d.toLocaleTimeString());
  return date;
}

//For all Homepage get requests
router.get('/wakanda', function (req, res, next){
  //Locate and display all post records
  postmodel.find({})
    .then((posts)=>{
      res.render('homepage',{
        posts: posts
      });
    })
    .catch((err)=>{
      if (err){
        throw new Error("QueryError", postmodel);
      }
    });
  console.log('Successfully connected to Home page');
});


router.post('/wakanda', function (req, res, next){
  // redirect all incomplete posts
  if (req.body.firstname.trim() == "" || req.body.lastname.trim() == "" || req.body.topic.trim() == ""){
    console.log('got it');
    res.redirect('/posts/wakanda');
  }
  else{
    var newpost = {
      firstname : req.body.firstname.trim(),
      lastname : req.body.lastname.trim(),
      topic : req.body.topic.trim(),
      content : req.body.content,
      postdate : getDate()
    };

    var submitpost = new postmodel(newpost);

    submitpost.save()
    .then((c)=>{
      res.redirect('/posts/wakanda');
    })
    .catch((err)=>{
      if(err){
        console.log(err);
        throw new Error("UploadError", submitpost);
      }
    });
  }
});


router.get('/update/:id', (req, res, next)=>{

  postmodel.findOne({'_id': req.params.id})
    .then((found)=>{
      res.render('update',{
        post: found
      });
    })
    .catch((err)=>{
      if (err){
        throw new Error("UpdateQueryError", postmodel);
      }
    });

});

router.post('/update/:id', (req, res, next)=>{

  postmodel.findOne({'_id': req.body.id})
    .then((found)=>{
      var update = {
        topic: req.body.topic.trim(),
        content: req.body.content.trim(),
        postdate : getDate()
      }
      found.set(update);
      found.save().then(()=>{
        res.redirect('/posts/wakanda');
      });
    })
    .catch((err)=>{
      if (err){
        throw new Error("SaveQueryError", postmodel);
      }
    });
});


router.get('/delete/:topic', (req, res, next)=>{
  postmodel.remove({ topic: req.params.topic }, function (err) {
    res.redirect('/posts/wakanda');
  });
});

router.use(function (err, req, res, next) {
  console.log(err.message);
  console.error(err.stack);
  res.status(500).send('There is an error with this request');
});

router.use(function (req, res, next) {
  res.status(404).send("Page cannot be found!")
});


module.exports = router;
