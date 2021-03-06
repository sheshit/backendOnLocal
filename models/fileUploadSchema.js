var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var imageUploadSchema = new Schema(
  {
    post_id:String,
    user_id:String,
    username: String,
    userPhoto:String,
    tagline: String,
    uploadFile: String,
    fileType:String,
    numberOfLikes: Number,
    likedBy:[String],
    discussionId: String
  },
  {
    timestamps: true
  }
);

var Upload = mongoose.model("Upload", imageUploadSchema);

module.exports = Upload;
