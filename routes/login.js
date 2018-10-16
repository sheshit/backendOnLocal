const express = require("express");
const loginRouter = express.Router();

const bodyParser = require("body-parser");
loginRouter.use(bodyParser.json());
var assert = require("assert");

var mongoose = require("mongoose");
var User = require("../models/userSchema");

var url =
  "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/Users?retryWrites=true";
console.log("login.js");

loginRouter.post("/", (req, res) => {
  const doc = new User({
    userId: req.body.userId,
    name: req.body.name,
    email: req.body.email,
    photoUrl: req.body.photoUrl,
    posts: []
  });
  mongoose.connect(url,{useNewUrlParser : true},function(err, db){
    assert.equal(null,err);
    db.findOne({userId:req.body.userId}).then(function(user){
      assert.equal(null,err);
      if(!user){
        db.collection("Users").insertOne(doc, (err,result) => {
          assert.equal(null, err); 
          console.log("user inserted");
          res.send("user inserted successfully");
          db.close();
      });
      }
    }).catch(err);    
});
});

module.exports = loginRouter;
