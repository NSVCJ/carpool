/* Import node's http module: */
var http = require("http");
var express = require('express');
var parser = require('body-parser');
var router = require('./routes.js');
var app = express();
module.exports.app = app;

//not sure what port to set when we deploy
// app.set('port', 3000);

app.use(parser.json());
app.use('/api', router);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//current api paths is
// /api/users /api/trips

/*
get request to our server
www.oursite.com/api/something
(something) is a generic path. prob will be user and trips
CURRENTLY routing is setup for /api/users to do GET/PUT
in return you will get list of drivers
post driver information
in return you will be able to give the information of a driver.
*/

//*****************************************************************************
//*****************************************************************************

//will need to setup a client folder
app.use(express.static("../public"));
var port = process.env.PORT || 8000;
//*****************************************************************************
//*****************************************************************************

app.listen(port, function() {
  console.log('Server started: http://localhost:' + port + '/');
});
