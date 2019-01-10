var mongoose = require('mongoose');

var schemaclass = mongoose.Schema;

var postschema = new schemaclass({
  firstname : {type: String, required : true},
  lastname : {type: String, required : true},
  topic : {type: String, required :true},
  content : {type: String},
  postdate: {type: String},
});


module.exports = mongoose.model('apiposts', postschema);
