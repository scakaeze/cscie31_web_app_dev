var postmodel = require('../models/postmodel');

class PostService{
//LIST
  static list(){
    return postmodel.find({})
      .then((posts)=>{
        return posts;
      });
  }

//READ
  static read(id){
    return postmodel.findById(id)
      .then((post)=>{
        return post;
      });
  }

//CREATE
  static create(obj){
    var newpost = new postmodel(obj);
    return newpost.save();
  }

//Update
  static update(id, newdata){
    return postmodel.findById(id)
     .then((post)=>{
       post.set(newdata);
       post.save();
       return post;
     });
  }

//DELETE
  static delete(id){
    return postmodel.remove({_id: id})
      .then((obj)=>{
        return obj;
    })
  }
}

module.exports = {
  PostService
};
