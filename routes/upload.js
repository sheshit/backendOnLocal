const express = require('express');
const uploadRouter = express.Router();

var mongoose = require("mongoose");
var Upload = require('../models/imageUploadSchema');
var fetch = require("node-fetch");
var multer = require('multer');

const storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null, './uploads/');
  },
  filename:function(req,file,callback){
    callback(null, Date.now()+file.originalname);
  }
});

var upload = multer({storage : storage});

var uri = "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/FileUploads?retryWrites=true";
console.log("upload.js");
mongoose.connect(uri, { useNewUrlParser: true },function(err,client){
  if (err) {
throw new Error('Database failed to connect!');
} else {
console.log('MongoDB successfully connected');
console.log("Start sending Requests...");
  }
});

uploadRouter.post('/',upload.single('uploadImage'),function(req,res,next){
  console.log("The Image data coming from Post request" + req.file);
  var uploadData = new Upload({
    username:req.body.username,
    tagline:req.body.tagline,
    uploadImage:req.file.path,
  });
  console.log(uploadData);
  uploadData.save()
  .then(result=>{
    console.log("Image uploaded");
    res.send("image uploaded");
  }).catch(err => {
  res.status(400).send("unable to upload");
  });
});

module.exports = uploadRouter;
