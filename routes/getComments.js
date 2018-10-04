const express = require("express");
const getCommentsRouter = express.Router();

var mongoose = require("mongoose");
var Upload = require("../models/imageUploadSchema");
var fetch = require("node-fetch");
var multer = require("multer");
var assert = require("assert");

var url =
  "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/Comments?";
console.log("getComments.js");

getCommentsRouter.get("/data/page=:pageOffset", function(req, res, next) {
  var resultArray = [];
  console.log("received request");
  mongoose.connect(
    url,
    { useNewUrlParser: true },
    function(err, db) {
      assert.equal(null, err);
      const cursor = db
        .collection("5bb1e34ec06d7f2d809650a5.jpg")
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
          console.log("sending response");
          console.log(resultArray);
          res.send(resultArray);
        }
      );
    }
  );
});

module.exports = getCommentsRouter;