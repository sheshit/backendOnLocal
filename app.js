var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var faviconRouter = require("./routes/favicon");
var LoginRouter = require("./routes/login");
var uploadImageRouter = require("./routes/imageUpload");
var getPostsRouter = require("./routes/getPosts.js");
var commentRouter = require('./routes/newComment');
var getCommentsRouter = require('./routes/getComments.js');
var uploadVideoRouter = require("./routes/videoUpload.js");
var LikesRouter = require("./routes/handleLikes");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/favicon.ico",faviconRouter);
app.use("/google-login", LoginRouter);
app.use("/upload-image", uploadImageRouter);
app.use("/upload-video", uploadVideoRouter);
app.use("/get-posts", getPostsRouter);
app.use('/newComment' , commentRouter);
app.use("/getComments", getCommentsRouter);
app.use("/handleLikes",LikesRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
