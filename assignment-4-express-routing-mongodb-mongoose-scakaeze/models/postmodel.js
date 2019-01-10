var mongoose = require('mongoose');

var schemaclass = mongoose.Schema;

var postschema = new schemaclass({
  postfname : {type: String, required : true},
  postlname : {type: String, required : true},
  topic : {type: String, required :true},
  content : {type: String},
  postdate: {type: String},
});


module.exports = mongoose.model('posts', postschema);
