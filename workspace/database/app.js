require('dotenv').config();
var mongoose = require ('mongoose');


mongoose.connect('mongodb://'+ process.env.DB_USER + ':'+process.env.DB_PASS+'@cluster0-shard-00-00-fg15e.mongodb.net:27017,cluster0-shard-00-01-fg15e.mongodb.net:27017,cluster0-shard-00-02-fg15e.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var db = mongoose.connection;

db.on('open', function(){
  console.log("connected");

  var characterSchema = mongoose.Schema({
    name: {type: String, required:true},
    role: {type: String, required:false},
    story: String
  });

  var Character = mongoose.model('Character', characterSchema);
  var c1 = new Character({name: 'Adam Ewing', role: "Lawyer", story: "The Pacific Journal of Adam Ewing"});

  c1.save((err, c)=>{
    if (err){
      console.log(error);
    }
    console.log("Saved Characters");
    console.log(c);

    Character.find({},(err, characters)=>{
      if (err){
        console.log(error);
      }
      console.log("Found Characters");
      console.log(characters);

      for (var i = 0; i < characters.length; i++){
        console.log("removed record number " + i);
        characters[i].remove((err)=>{
          console.log("Internal removed record number " + i);
        });
      }

    });
  });


}).catch((err)=>{
  console.error('${err} errored out!')
});
