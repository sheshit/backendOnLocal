var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var accessTokenSchema = new Schema({
 userId:String,
 accessToken: String,
 refreshToken:String,
 name:String,
 email:String,
 photoUrl:String,
},
{
  timestamps:true,
});

var User = mongoose.model("User", accessTokenSchema);

module.exports = User;
