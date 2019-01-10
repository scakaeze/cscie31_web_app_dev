var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');
var PostService = postController.PostService;


//Time Getter
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


//API Demo Route
router.get('/apidemo', (req, res, next)=>{
  console.log("API Test page success");
  res.render('test');
});


//List Web Route
router.get('/wakanda', function (req, res, next){

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


//Create Web Route
router.post('/wakanda',(req, res, next)=>{
  // If any first name, last name or topic is not included, page is reloaded without saving the data
  if (req.body.firstname.trim() === "" || req.body.lastname.trim() === "" || req.body.topic.trim() === ""){
    res.redirect('/web/wakanda');
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
      console.log('Successfully Created New Post');
      res.redirect('/web/wakanda');
    }).catch((err)=>{
      console.log(err);
      throw new Error("CreatePostError", PostService);
    });
  }
});


//Read Web Route
router.get('/update/:id', (req, res, next)=>{

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


//Update Web Route
router.post('/update/:id', (req, res, next)=>{

  var update = {
    topic: req.body.topic.trim(),
    content: req.body.content.trim(),
    postdate : getDate()
  };

  PostService.update(req.body.id, update)
  .then((updated)=>{
    console.log('Successfully Updated Post');
    res.redirect('/web/wakanda');
  }).catch((err)=>{
    if (err){
      throw new Error("UpdateError", PostService);
    }
  });
});


//Delete Web Route
router.delete('/update/:id', (req, res, next)=>{

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
