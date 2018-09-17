const express = require('express');
const uploadRouter = express.Router();

var mongoose = require("mongoose");
var Upload = require('../models/imageUploadSchema');
var fetch = require("node-fetch");
var multer = require('multer');
var assert = require('assert');

const storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null, './uploads/');
  },
  filename:function(req,file,callback){
    callback(null, Date.now()+file.originalname);
  }
});

var upload = multer({storage : storage});

var url = "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/FileUploads?retryWrites=true";
console.log("upload.js");

uploadRouter.post('/',upload.single('uploadImage'),function(req,res,next){
  console.log("The Image data coming from Post request" + req.file);
  var item = new Upload({
    username:req.body.username,
    tagline:req.body.tagline,
    uploadImage:req.file.path,
  });
  console.log(item);
  mongoose.connect(url, { useNewUrlParser: true } , function(err,db){
    assert.equal(null,err);
    db.collection('uploads').insertOne(item, function(err, result){
      assert.equal(null,err);
      res.send("item saved to database");
      console.log("item inserted as above format");
      db.close();
    });
});
});

mongoose.disconnect();

module.exports = uploadRouter;
