var path = require("path");
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var multer = require("multer");
var mysql = require("mysql");

var settings = require("./config/settings");
var environment = require("./config/environment");
var socket = require("./app/socket");
var routes = require("./config/routes");
var settings = require("./config/settings");

var app = express();

// Add headers
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// Config
app.set("port", settings.port);
app.engine("html", require("ejs").renderFile);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, "../dist")));
app.use("", express.static(path.join(__dirname, "../dist")));
app.use("/", express.static(path.join(__dirname, "../dist")));

var connection = mysql.createConnection({
  host: settings.host_address,
  user: "root",
  password: "pass",
  database: "afcash_db"
});
connection.connect(function(err) {
  if (err) {
    console.log(err);
    console.log("connection failed");
    return;
  }
  console.log("connection success");
});

routes(app, connection);
environment(app);

var server = app.listen(settings.port, function(err) {
  if (!err) console.log("listening on port " + server.address().port);
  else console.log(err);
});

var io = require("socket.io").listen(server);
socket(io, connection);
