var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var uri = 'mongodb+srv://projectNative:Rahuldravid@180@cluster0-53qcr.mongodb.net/test?retryWrites=true';
//mongoose.connect("mongodb+srv://projectNative:Rahuldravid@180@cluster0-53qcr.mongodb.net/test?retryWrites=true");
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(uri);

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

module.exports = router;
