var path = require('path');
var settings = require('./settings');
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var multer = require('multer');

module.exports = function(app) {
  app.use(express.static(path.normalize(__dirname + '/../..') + '/server/uploads'))
  // Angular DIST output folder
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use('', express.static(path.join(__dirname, '../../dist')));
  app.use('*', express.static(path.join(__dirname, '../../dist')));
  app.use(express.static(__dirname + '/dist'));

  /*
  //session
  app.use(session({
    resave: false,              // don't save session if unmodified
    saveUninitialized: false,   // don't create session until something stored
    secret: 'keyboard cat'
  }));
  app.use(cookieParser('my secret here'));
  */
}
