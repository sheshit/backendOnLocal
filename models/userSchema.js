var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
 userId:String,
 name:String,
 email:String,
 photoUrl:String,
 posts:[String]
},
{
  timestamps:true,
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
