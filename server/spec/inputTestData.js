var _ = require('lodash');
var Promise = require('bluebird');
var request = require('request');
var rp = require('request-promise');

var signups = require('./testUsers.js').testUsers;
var driverPosts = require('./testDriverPosts.js').testDriverPosts;
var drivers = require('./testDrivers.js').testDrivers;
var riderPosts = require('./testRiderPosts.js').testRiderPosts;
var confirmRiders = require('./testRiderConfirms.js').confirmRiders;
var signupQueries = [];
var tripPostQueries = [];
var riderConfirmations = [];

_.each(signups, function(json) {
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
      _.each(confirmRiders, function(json){
        riderConfirmations.push(
          rp({
            method: 'PUT',
            uri: 'http://127.0.0.1:8000/api/driverProfile',
            json: json
          })
        )
      });
      Promise.all(riderConfirmations)
      .then(function(){
        console.log('Wow everything works, great job Nick!')
      })
      .catch(function(err){
        console.log("++++line:84 caught error")
        console.log(err)
      })
    })
    .catch(function(err){
      console.log("++++line:62 caught error")
      console.log(err)
    })
  })
})
