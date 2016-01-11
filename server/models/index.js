// var db = require("../db/db.js");
//var serverHelpers = require("../server-helpers");
//Someday, everything will break because I've confused camelCase
//with under_scores. You have been warned.

module.exports = models = {
  users:{
    get: function(){},
    post: function(){}
  },
  trips: {
    get: function(callback, userData) {
      var data = userData;
      // somefunction on db(){
      //
      // }.then(data){
      //   callback(data);
      // }
    },
    post: function(callback, data) {

      //MVP: no profile associated, so a new user is created for every post.
      //data must pass in info about driver, event, and trip
      //maybe data should be an object with each of those properties
      db.User.create( {
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone
      }).then(function(user) {
        db.Trip.create( {
          start_time: data.trip.startTime,
          price: data.trip.price,
          eventful_id: data.event.id
        }).then(function(trip) {
          db.TripUser.create( {
            lat: data.trip.lat,
            long: data.trip.long,
            role: "Driver"
          }).then(function(tripUser) {
            console.log(tripUser); //see if I have setter functions
            tripUser.setUser(user); //not sure if setUser is a methods here
            tripUser.setTrip(trip);
            callback({
              user: user,
              trip: trip,
              tripUser: tripUser
            });
          });
        });
      });
    }
  }
}
