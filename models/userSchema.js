var mongoose = require("mongoose");
var accessTokenSchema = new mongoose.Schema({
 accessToken: String,
 name:String,
 email:String,
 photoUrl:String,
});

var User = mongoose.model("User", accessTokenSchema);

module.exports = User;
