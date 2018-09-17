const express = require('express');
const uploadRouter = express.Router();

var mongoose = require("mongoose");
var Upload = require('../models/imageUploadSchema');
var fetch = require("node-fetch");
var multer = require('multer');
var assert = require('assert');
const AWS = require('aws-sdk');
const fs=require('fs');
const keys = require('../keys.js');

var url = "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/FileUploads?retryWrites=true";
console.log("upload.js");

const storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null, './uploads/');
  },
  filename:function(req,file,callback){
    callback(null, Date.now()+file.originalname);
  }
});

var upload = multer({storage : storage});

AWS.config.update({
  accessKeyId: keys.iam_access_id,
  secretAccessKey: keys.iam_secret,
  region: 'us-east-1',
});

//Creating a new instance of S3:
const s3= new AWS.S3();

uploadRouter.post('/',upload.single('uploadImage'),function(req,res,next){
  uploadFile(req.file.path, req.file.filename ,res);
  console.log("The Image data coming from Post request" + JSON.stringify(req.file));
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

function uploadFile(source,targetName,res){
  console.log('preparing to upload...');
  fs.readFile(source, function (err, filedata) {
    if (!err) {
      const putParams = {
          Bucket      : 'projectnativeimages-bucket',
          Key         : targetName,
          Body        : filedata
      };
      s3.putObject(putParams, function(err, data){
        if (err) {
          console.log('Could nor upload the file. Error :',err);
          return res.send({success:false});
        } 
        else{
          fs.unlink(source);// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
          console.log(data);
          return res.send({success:true});
        }
      });
    }
    else{
      console.log({'err':err});
    }
  });
}

module.exports = uploadRouter;
