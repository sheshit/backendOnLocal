const express = require("express");
const getCommentsRouter = express.Router();

var mongoose = require("mongoose");
var assert = require("assert");

var url =
  "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/Comments?";
console.log("getComments.js");

getCommentsRouter.get("/data/:post_id/page=:pageOffset", function(req, res, next) {
  var resultArray = [];
  console.log("received request");
  mongoose.connect(
    url,
    { useNewUrlParser: true },
    function(err, db) {
      assert.equal(null, err);
      const cursor = db
        .collection(req.params.post_id)
        .find()
        .skip(req.params.pageOffset * 5)
        .sort({ _id: -1 })
        .limit(5);
      cursor.forEach(
        (doc, err) => {
          assert.equal(err, null);
          resultArray.push(doc);
        },
        function() {
          db.close();
         // console.log(resultArray);
          res.send(resultArray);
          console.log("sending response");
        }
      );
    }
  );
});

module.exports = getCommentsRouter;