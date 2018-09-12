var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var imageUploadSchema = new Schema({
 username:String,
 tagline:String,
 uploadImage:String,
},
{
  timestamps:true,
});

var Upload = mongoose.model("Upload", imageUploadSchema);

module.exports = Upload;
