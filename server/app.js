/* Import node's http module: */
var http = require("http");
var express = require('express');
var parser = require('body-parser');
var cors = require('cors');
var router = require('./routes.js');
var app = express();
module.exports.app = app;

app.use(cors());

//not sure what port to set when we deploy
app.set('port', 3000);

app.use(parser.json());
app.use('/api', router);

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
// app.use(express.static("../client/app"));

//*****************************************************************************
//*****************************************************************************
