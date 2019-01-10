var express = require('express');
var router = express.Router();
var postController = require('../../controllers/postController');
var postmodel = require('../../models/postmodel');
var app = express();


var PostService = postController.PostService;


function getDate(){
  var d = new Date();
  var date = (d.toLocaleDateString() + " @ " + d.toLocaleTimeString());
  return date;
}


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

  PostService.list()
  .then((posts)=>{
    res.render('homepage',{
      posts: posts
    });

  }).catch((err)=>{
      res.status(404);
      res.end();
  });
  console.log('Successfully connected to Home page');
});



router.get('/wakanda/:postid', function (req, res, next){

  PostService.read(req.params.postid)
  .then((post)=>{
    console.log('API: Found posts: ${post}');
    res.status(200);
    res.send(JSON.stringify(post));
  }).catch((err)=>{
      res.status(404);
      res.end();
  });
});



router.post('/wakanda', async (req, res, next)=>{

  var newpost = {
    firstname : req.body.firstname.trim(),
    lastname : req.body.lastname.trim(),
    topic : req.body.topic.trim(),
    content : req.body.content,
    postdate : getDate()
  };

  try{
    const postsave = await PostService.create(newpost);
    res.redirect('/api/posts/wakanda');
  }catch(err){
    console.log(err);
    throw new Error("PostSaveError", postsave);
  }
});



router.put('/:id', (req, res, next)=>{

  console.log('it got to put');
  var update = {
    topic: req.body.topic.trim(),
    content: req.body.content.trim(),
    postdate : getDate()
  }
  console.log('putting ${req.params.id}');

  PostService.update(req.params.id, update)
  .then((updatedpost)=>{
    res.status(200);
    res.send(JSON.stringify(updatedpost));
  }).catch((err)=>{
    res.status(404);
    res.end();
  });
});



router.delete('/:id', (req, res, next)=>{

  console.log('deleting ${req.params.id}');

  PostService.delete(req.params.id)
  .then((deletedpost)=>{
    res.status(200);
    res.send(JSON.stringify(deletedpost));
  }).catch((err)=>{
    res.status(404);
    res.end();
  });
});



module.exports = router;














//just to make page longer
