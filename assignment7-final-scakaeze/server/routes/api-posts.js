var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');
var app = express();
var PostService = postController.PostService;


function getDate(){
  var d = new Date();
  var date = (d.toLocaleDateString() + " @ " + d.toLocaleTimeString());
  return date;
};


//Pre flight configuration
router.use((req, res, next)=>{
  res.set({
    'Access-Control-Allow-Origin':'*', // Allow AJAX access from any domain
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',// Allow methods for 'preflight'
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers',// Allow headers for 'preflight
  });

  if(req.method == 'OPTIONS'){// if this is a preflight, we're done and can send the response with our headers
    return res.status(200).end();
  }
  next();
});


//List API Route
router.get('/wakanda', (req, res, next)=>{

  PostService.list()
  .then((posts)=>{
    console.log('API: Found posts: ${posts}');
    res.status(200).json(posts);
  }).catch((err)=>{
    if (err){
      const error = new Error("List Error === " + err.message);
      next(error);
    }
  });
});


//Read API Route
router.get('/wakanda/:id', (req, res, next)=>{

  PostService.read(req.params.id)
  .then((found)=>{
    console.log('API: Found post: ${found}');
    res.status(200).json(found);
  }).catch((err)=>{
    if (err){
      const error = new Error("Read Error === " + err.message);
      next(error);
    }
  });
});


//Create API Route
router.post('/wakanda',(req,res,next)=>{

  if (req.body.firstname.trim() === "" || req.body.lastname.trim() === "" || req.body.topic.trim() === ""){
    res.status(200).json();
  }
  else{

    var newpost = {
      firstname : req.body.firstname.trim(),
      lastname : req.body.lastname.trim(),
      topic : req.body.topic.trim(),
      content : req.body.content,
      postdate : getDate()
    };

    PostService.create(newpost)
    .then((savedpost)=>{
      console.log('API: created new post');
      res.status(201).json(savedpost);
    }).catch((err)=>{
      if (err){
        const error = new Error("Create Error === " + err.message);
        next(error);
      }
    });
  }

});


//Update API Route
router.put('/wakanda/:id', (req, res, next)=>{

  var update = {
    topic: req.body.topic.trim(),
    content: req.body.content.trim(),
    postdate : getDate()
  };

  PostService.update(req.params.id, update)
  .then((updated)=>{
    console.log('API: updated post id ' + req.params.id);
    res.status(200).json(updated);
  }).catch((err)=>{
    if (err){
      const error = new Error("Update Error === " + err.message);
      next(error);
    }
  });
});


//Delete APi Route
router.delete('/wakanda/:id', (req, res, next)=>{

  PostService.delete(req.params.id)
  .then((deleted)=>{
    console.log('API: deleted post id ' + req.params.id);
    res.status(200).json(deleted);
  }).catch((err)=>{
    if (err){
      const error = new Error("Delete Error === " + err.message);
      next(error);
    }
  });

});



module.exports = router;
