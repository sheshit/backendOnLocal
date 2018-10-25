const express = require("express");
const uploadRouter = express.Router();

var mongoose = require("mongoose");
var Upload = require("../models/fileUploadSchema");
var multer = require("multer");
var assert = require("assert");
const AWS = require("aws-sdk");
const fs = require("fs");
const keys = require("../keys.js");

var uploadURL =
  "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/FileUploads?retryWrites=true";
var commentDocumentURL =
  "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/Comments?";

console.log("imageUpload.js");

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var upload = multer({ storage: storage });

AWS.config.update({
  accessKeyId: keys.iam_access_id,
  secretAccessKey: keys.iam_secret,
  region: "ap-south-1"
});

//Creating a new instance of S3:
const s3 = new AWS.S3();

const sharp = require("sharp");

function resize(source, format, targetName,width, height) {

  sharp(source).resize(width, null).withMetadata().toBuffer(function (err, data){
    if (err) throw err;
    const putParams = {
      Bucket: "projectnativeimages-bucket",
      Key: targetName,
      Body: data
    };
    s3.putObject(putParams, function(err, data) {
      if (err) {
        console.log("Could nor upload the file. Error :", err);
      } else {
         fs.unlink(source,(err) => {
           if(err) throw err;
           console.log("file deleted from uploads folder");
         }); // Deleting the file from uploads folder(Optional).
        console.log("data from s3 " + JSON.stringify(data));
      }
    });
  });
}


uploadRouter.post("/", upload.single("uploadFile"), function(req, res, next) {
  console.log(
    "The Image data coming from Post request" + JSON.stringify(req.file)
  );

  var docId = mongoose.Types.ObjectId();

  //console.log("docId is " + docId);
  var doc = new Upload({
    post_id: docId + "",
    user_id: req.body.userId,
    username: req.body.username,
    userPhoto: req.body.userPhoto,
    tagline: req.body.tagline,
    uploadFile: docId + ".jpg",
    fileType: req.body.fileType,
    numberOfLikes: req.body.numberOfLikes,
    likedBy: [],
    discussionId: docId + ""
  });
  doc._id = docId; //Specifies the ObjectId of the document.
  mongoose.connect(
    commentDocumentURL,
    { useNewUrlParser: true },
    function(err, db) {
      assert.equal(null, err);
      console.log("create collection mongoose");
      db.createCollection(docId + "", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
    }
  );
  docId = docId + ".jpg";
  resize(req.file.path,"webp",docId,918,1632);
  console.log(doc);
  mongoose.connect(
    uploadURL,
    { useNewUrlParser: true },
    function(err, db) {
      assert.equal(null, err);
      db.collection("uploads").insertOne(doc, function(err, result) {
        assert.equal(null, err);
        res.send("all ok");
        console.log("doc inserted as above format");
        db.close();
      });
    }
  );
});

module.exports = uploadRouter;
