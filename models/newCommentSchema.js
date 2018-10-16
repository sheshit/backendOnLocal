var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var newCommentSchema = new Schema(
  {
    name: String,
    userId: String,
    userPhoto: String,
    text: String,
    children: [newCommentSchema],
    likes: Number
  },
  {
    timestamps: true
  }
);

var comment = mongoose.model("comment", newCommentSchema);

module.exports = Upload;
