var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://projectNative:Rahuldravid@180@cluster0-53qcr.mongodb.net/test?retryWrites=true";

MongoClient.connect(uri, function(err, client) {
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});
/*
var userSchema = new mongoose.Schema({
 firstName: String,
 lastNameName: String
});

var User = mongoose.model("User", userSchema);

var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post("/login", (req, res) => {
 var myData = new User(req.body);
 myData.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

module.exports = router;*/
