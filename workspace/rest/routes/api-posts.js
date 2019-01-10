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


router.get('/wakanda', function (req, res, next){
  //List API Usage
  PostService.list()
  .then((posts)=>{
    res.render('homepage',{
      posts: posts
    });
  }).catch((err)=>{
      res.status(404);
      throw new Error("ListPostsError", PostService);
      res.end();
  });
  console.log('Successfully connected to Home page');
});


router.post('/wakanda',(req, res, next)=>{
  // If any first name, last name or topic is not included, page is reloaded without saving the data
  if (req.body.firstname.trim() === "" || req.body.lastname.trim() === "" || req.body.topic.trim() === ""){
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
    //Create API usage
    PostService.create(newpost)
    .then((savedpost)=>{
      console.log('Successfully Created New Post');
      res.redirect('/posts/wakanda');
    }).catch((err)=>{
      console.log(err);
      throw new Error("CreatePostError", PostService);
    });
  }
});


router.get('/update/:id', (req, res, next)=>{
  //Read APi usage
  PostService.read(req.params.id)
  .then((found)=>{
    console.log('Successfully Read Post');
    res.render('update',{
      post: found
    });
  }).catch((err)=>{
    if (err){
      throw new Error("ReadPostError", PostService);
    }
  });
});


router.post('/update/:id', (req, res, next)=>{

  var update = {
    topic: req.body.topic.trim(),
    content: req.body.content.trim(),
    postdate : getDate()
  };
  //Update API usage
  PostService.update(req.body.id, update)
  .then((updated)=>{
    console.log('Successfully Updated Post');
    res.redirect('/posts/wakanda');
  }).catch((err)=>{
    if (err){
      throw new Error("UpdateError", PostService);
    }
  });
});

router.delete('/update/:id', (req, res, next)=>{
  //Delete API usage
  PostService.delete(req.body.id)
  .then((deleted)=>{
    console.log('Successfully Deleted Post');
    res.end();
  }).catch((err)=>{
    if (err){
      throw new Error("DeleteError", PostService);
    }
  });
});



module.exports = router;

















// Just doing
