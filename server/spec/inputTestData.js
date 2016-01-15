var request = require('request');
var _ = require('lodash');
var signups = require('./testUsers.js').testUsers;
var driverPosts = require('./testDriverPosts.js').testDriverPosts;
var Promise = require('bluebird');

// console.log("Things are working fine!!!!");
// console.log("signUps are", signUps);
var users = [];
var signupQueries = [];

_.each(signups, function(json) {
  signupQueries.push(
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:8000/signup',
      json: json
    }, function(error, res, body) {
      if (error) {
        return console.error('upload failed:', error);
      }
      users.push(body);
      console.log('User signup successful!  Server responded with:', body);
    })
  )
})
Promise.all(signupQueries)
.then(function(){
  console.log("Users are", users);

  _.each(driverPosts, function(json, index) {
    json.user = users[index];
    console.log("~~~~~~~~~~~~~NEW JSON IS~~~~~~~~~", json);
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:8000/api/trips',
      json: json
    }, function(error, response, body) {
      if (error) {
        return console.error('upload failed:', error);
      }
      console.log('Trip post successful!  Server responded with:', body);
    });
  });
});


//Not going in order. It's doing the trip each loop before starting the user post request.
