var express = require('express');
var commentRouter = express.Router();
var mongoose = require('mongoose');

var url = "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/Comments?";
console.log("newComments.js");
var assert = require("assert");

commentRouter.post('/', (req,res,next) => {
     console.log("in comments");
     const doc = {
         name : req.body.name,
         userId:req.body.userId,
         userPhoto:req.body.userPhoto,
         text : req.body.text,
         children : [],
         likes : req.body.likes,
     }
     mongoose.connect(url,{useNewUrlParser : true},function(err, db){
         assert.equal(null,err);
         console.log(req.body.post_id);
         db.collection(req.body.post_id).insertOne(doc, (err,result) => {
             assert.equal(null, err);
             console.log("comment inserted");
             res.send("comment inserted successfully");
             db.close();
         });
     });
});

module.exports = commentRouter;