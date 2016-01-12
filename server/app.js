/* Import node's http module: */
var http = require("http");
var express = require('express');
var parser = require('body-parser');
var router = require('./routes.js');
var routerSign = require('./routesSign.js')
var db = require('./db/db.js');
var app = express();
module.exports.app = app;

<<<<<<< fce5d7ba445fcec2df9eabe5b58b207bb7070d8d
=======
//not sure what port to set when we deploy
// app.set('port', 3000);

>>>>>>> (feature) setup heroku files for delpoy
app.use(parser.json());
app.use('/api', router);
app.use('/', routerSign);

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
<<<<<<< fce5d7ba445fcec2df9eabe5b58b207bb7070d8d
app.use(express.static("./public"));
app.set('port', process.env.PORT || 8000);
//*****************************************************************************
//*****************************************************************************

db.sequelize.sync().then(function() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
=======
app.use(express.static("../public"));
var port = process.env.PORT || 8000;
//*****************************************************************************
//*****************************************************************************

app.listen(port, function() {
  console.log('Server started: http://localhost:' + port + '/');
>>>>>>> (feature) setup heroku files for delpoy
});
