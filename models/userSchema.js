var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
 firstName: String,
 lastName: String
});

var User = mongoose.model("User", userSchema);

module.exports = User;
