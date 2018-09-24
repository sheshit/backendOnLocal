const express = require('express');
const getPostsRouter = express.Router();

var mongoose = require("mongoose");
var Upload = require('../models/imageUploadSchema');
var fetch = require("node-fetch");
var multer = require('multer');
var assert = require('assert');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var upload = multer({ storage: storage });

var url = "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/FileUploads?retryWrites=true";
console.log("getPosts.js");

getPostsRouter.get('/data/page=:pageOffset', function (req, res, next) {
  var resultArray = [];
  mongoose.connect(url, { useNewUrlParser: true }, function (err, db) {
    assert.equal(null, err);
    const cursor = db.collection('uploads').find().skip(req.params.pageOffset*5).sort({ _id: -1 }).limit(5);
    cursor.forEach((doc, err) => {
      assert.equal(err, null);
      resultArray.push(doc);
    },
      function () {
        db.close();
        console.log(resultArray);
        res.send(resultArray);
      });

  });
});


module.exports = getPostsRouter;
