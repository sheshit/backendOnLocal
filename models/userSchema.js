var mongoose = require("mongoose");
var accessTokenSchema = new mongoose.Schema({
 accessToken: String
});

var User = mongoose.model("User", accessTokenSchema);

module.exports = User;
