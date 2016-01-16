var _ = require('lodash');
var Promise = require('bluebird');
var request = require('request');
var rp = require('request-promise');

var signups = require('./testUsers.js').testUsers;
var driverPosts = require('./testDriverPosts.js').testDriverPosts;
var drivers = require('./testDrivers.js').testDrivers;
var riderPosts = require('./testRiderPosts.js').testRiderPosts;
var signupQueries = [];
var tripPostQueries = [];

_.each(signups, function(json) {
  // console.log("What is json?", json);
  signupQueries.push(
    rp({
      method: 'POST',
      uri: 'http://127.0.0.1:8000/signup',
      json: json
    })
  )
});

Promise.all(signupQueries)
.then(function(){
  _.each(driverPosts, function(json, index) {
    // console.log("Index is", index, "for", json);
    // console.log("The driver for this trip is", drivers[index]);
    // json.user = drivers[index];
    var options = {
      method: 'POST',
      uri: 'http://127.0.0.1:8000/api/eventDriver',
      json: json,
      transform: function(body, res) {
        // console.log("Trip Post successful! Responded with", body);
      }
    }
    tripPostQueries.push(rp(options));
  });
  Promise.all(tripPostQueries)
  .then(function(){
    // console.log("Everything has been posted, great job.");
  })
})

.then(function(){
  var riderPostQueries = []
  _.each(riderPosts, function(json) {
    riderPostQueries.push(
      rp({
        method: 'POST',
        uri: 'http://127.0.0.1:8000/api/eventRider',
        json: json
      })
    )
  });
  Promise.all(riderPostQueries)
  .then(function(){
    console.log("Everything has been posted and is working great.");
  })
  .catch(function(err){
    console.log("++++line:62 caught error")
    console.log(err)
  })
})
