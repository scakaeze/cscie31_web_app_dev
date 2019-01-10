var express = require('express');
var router = express.Router();
var app = express();
var postController = require('../controllers/postController');
const PostService = postController.PostService;


function getDate(){
  var d = new Date();
  var date = (d.toLocaleDateString() + " @ " + d.toLocaleTimeString());
  return date;
};



router.use((req, res, next)=>{
  res.set({
    // Allow AJAX access from any domain
    'Access-Control-Allow-Origin':'*',
    // Allow methods and headers for 'preflight'
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers',
  });
  // if this is a preflight, we're done and can send the response with our headers
  if(req.method == 'OPTIONS'){
    return res.status(200).end();
  }
  next();
});


router.get('/test/', (req, res, next)=>{
  res.render('test');
  console.log("API Test page success");
});


router.get('/wakanda/', (req, res, next)=>{

  PostService.list()
  .then((posts)=>{
    console.log('API: Found posts: ${posts}');
    //console.log(posts);
    res.status(200).json(posts);
  }).catch((err)=>{
    if (err){
      const error = new Error("List Error === " + err.message);
      next(error);
    }
  });
});



router.get('/wakanda/:id', (req, res, next)=>{

  PostService.read(req.params.id)
  .then((found)=>{
    console.log('API: Found post: ${found}');
    //console.log(found);
    res.status(200).json(found);
  }).catch((err)=>{
    if (err){
      const error = new Error("Read Error === " + err.message);
      next(error);
    }
  });
});



router.post('/wakanda',(req,res,next)=>{

  if (req.body.firstname.trim() === "" || req.body.lastname.trim() === "" || req.body.topic.trim() === ""){
    res.status(400);
    res.end("Please fill out First name, Last name and Topic");
  }

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
    //console.log(savedpost);
    res.status(201).json(savedpost);
  }).catch((err)=>{
    if (err){
      const error = new Error("Create Error === " + err.message);
      next(error);
    }
  });
});



router.put('/wakanda/:id', (req, res, next)=>{

  var update = {
    topic: req.body.topic.trim(),
    content: req.body.content.trim(),
    postdate : getDate()
  };

  PostService.update(req.params.id, update)
  .then((updated)=>{
    console.log('API: updated post id ' + req.params.id);
    //console.log(updated);
    res.status(200).json(updated);
  }).catch((err)=>{
    if (err){
      const error = new Error("Update Error === " + err.message);
      next(error);
    }
  });
});



router.delete('/wakanda/:id', (req, res, next)=>{

  PostService.delete(req.params.id)
  .then((deleted)=>{
    console.log('API: deleted post id ' + req.params.id);
    //console.log(deleted);
    res.status(200).json(deleted);
  }).catch((err)=>{
    if (err){
      const error = new Error("Delete Error === " + err.message);
      next(error);
    }
  });

});



module.exports = router;
