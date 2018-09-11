const express = require('express');
const uploadRouter = express.Router();

var mongoose = require("mongoose");
var Upload = require('../models/imageUploadSchema');
var fetch = require("node-fetch");
var multer = require('multer');
var upload = multer({dest:'uploads/'});

var uri = "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/FileUploads?retryWrites=true";

mongoose.connect(uri, { useNewUrlParser: true },function(err,client){
  if (err) {
throw new Error('Database failed to connect!');
} else {
console.log('MongoDB successfully connected');
console.log("Start sending Requests.... lets rock and roll");
  }
});

uploadRouter.post('/',upload.single('uploadImage'),function(req,res,next){
  console.log(req.file);
  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  var uploadData = new Upload(req.body);
  uploadData.save()
  .then(result=>{
    console.log("Image uploaded");
    res.send("image uploaded");
  }).catch(err => {
  res.status(400).send("unable to upload");
  });
});

module.exports = uploadRouter;