const express = require('express');
const loginRouter = express.Router();

const bodyParser = require('body-parser');
loginRouter.use(bodyParser.json());

var mongoose = require("mongoose");
var User = require('../models/userSchema');
var fetch = require("node-fetch");

var uri = "mongodb+srv://newadmin:helloworld@cluster0-53qcr.mongodb.net/projectNativeUsers?retryWrites=true";
console.log("login.js");

mongoose.connect(uri, { useNewUrlParser: true },function(err,client){
  if (err) {
throw new Error('Database failed to connect!');
} else {
console.log('MongoDB successfully connected');
console.log("Start sending Requests...");
  }
});

loginRouter.route('/').get((req,res)=>{
  res.send("Done and dusted.");
}).post((req, res) => {
 var myData = new User(req.body);
 console.log("inside the post request");
// getUserInfo(req.body.accessToken);
 console.log(myData+"  this.is what goes into mongodb");
myData.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

mongoose.disconnect();

module.exports = loginRouter;
