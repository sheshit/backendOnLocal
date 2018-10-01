var express = require('express');
var commentRouter = express.Router();
var mongoose = require('mongoose');

var url = "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/Comments?";

var assert = require("assert");

commentRouter.post('/', (req,res,next) => {
     console.log("in comments");
     const doc = {
         name : req.body.name,
         text : req.body.text,
         children : [],
         likes : req.body.likes,
     }
     mongoose.connect(url,{useNewUrlParser : true},function(err, db){
         assert.equal(null,err);
         console.log(req.body.photoUrl);
         db.collection(req.body.photoUrl+"").insertOne(doc, (err,result) => {
             assert.equal(null, err);
             console.log("comment inserted");
             res.send("comment inserted successfully");
             db.close();
         });
     });
});

module.exports = commentRouter;