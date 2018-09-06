const express = require('express');
const loginRouter = express.Router();

const bodyParser = require('body-parser');
loginRouter.use(bodyParser.json());

var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;

var User = require('../models/userSchema');

var uri = "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/projectNativeUsers?retryWrites=true";

mongoose.connect(uri, { useNewUrlParser: true },function(err,client){
  if (err) {
throw new Error('Database failed to connect!');
} else {
console.log('MongoDB successfully connected');
  }
});

loginRouter.route('/').get((req,res)=>{
  res.send("Done and dusted.");
}).post((req, res) => {
 var myData = new User(req.body);
 console.log("inside the post");
 console.log(req.body+"  this is request body");
 console.log(myData+"  this.is what goes into mongodb");
myData.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

module.exports = loginRouter;
