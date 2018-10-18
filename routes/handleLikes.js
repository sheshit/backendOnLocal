const express = require("express");
const LikesRouter = express.Router();

var mongoose = require("mongoose");
var assert = require("assert");

var url =
  "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/FileUploads?retryWrites=true";
console.log("handleLikes.js");

LikesRouter.patch("/liked/:post_id", function(req, res, next) {
  mongoose.connect(
    url,
    { useNewUrlParser: true },
    function(err, db) {
      assert.equal(null, err);
      db.collection("uploads").update(
        { post_id: req.params.post_id },
        { $inc: { numberOfLikes: 1 } },
        function(err, result) {
          assert.equal(null, err);
          res.send("likes updated");
          db.close();
        });
    });
});

LikesRouter.patch("/disliked/:post_id", function(req, res, next) {
    mongoose.connect(
      url,
      { useNewUrlParser: true },
      function(err, db) {
        assert.equal(null, err);
        db.collection("uploads").update(
          { post_id: req.params.post_id },
          { $inc: { numberOfLikes: -1 } },
          function(err, result) {
            assert.equal(null, err);
            res.send("likes updated");
            db.close();
          });
      });
  });

module.exports = LikesRouter;