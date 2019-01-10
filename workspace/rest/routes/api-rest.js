var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');
var app = express();
const PostService = postController.PostService;

function getDate(){
  var d = new Date();
  var date = (d.toLocaleDateString() + " @ " + d.toLocaleTimeString());
  return date;
};

// photos - list
router.get('/wakanda', (req, res, next)=>{
  PostService.list()
  .then((posts)=>{
    console.log('API: Found posts: ${posts}');
    res.status(200).json(posts);
    //res.status(200);
    //res.set({'Content-type': 'application/json'});
    //res.send(JSON.stringify(posts));
  })
});


//photos/:postid - findone
router.get('/wakanda/:id', (req, res, next)=>{
  //Read APi usage
  PostService.read(req.params.id)
  .then((found)=>{
    console.log('API: Found post: ${found}');
    res.status(200).json(found);
    //res.status(200);
    //res.set({'Content-type': 'application/json'});
    //res.send(JSON.stringify(found));
    }).catch((err)=>{
    if (err){
      throw new Error("ReadPostError", PostService);
      res.status(404);
      res.end();
    }
  });
});
//photos Post create

// /Photos/:photoid - update

///Photos/:photoid - delete



module.exports = router;
