var db = require("../db");
var serverHelpers = require("../server-helpers");
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
    post: function(cb, data) {
      /*
      //MVP: no profile associated, so a new user is created for every post.
      //data must pass in info about driver, event, and trip
      //maybe data should be an object with each of those properties
      db.User.create( {
        name: data.name,
        email: data.email,
        phone: data.phone
      }).then(function(user) {
        cb(user)
        //What if the event exists in db already?
        if (serverHelpers.eventExists) {
        }
        //or do .then? Maybe. So you can pass on the object?
        db.Event.create( {
          name: data.event.name,
          location_lat: data.event.lat,
          location_long: data.event.long,
          start_time: data.event.startTime,
          type: data.event.type,
          description: data.event.description
        }).then(function(event) {
          db.Trip.create( {
            start_time: data.startTime,
            price: data.price
          }).then(function(trip) {
            db.TripUser.create( {
              start_lat: data.startLat,
              start_long: data.startLong,
              role: "Driver"
            }).then(function(tripUser) {
              console.log(tripUser); //see if I have setter functions
              //Set user
              //Set event
            })
          })
        })
      })
      */
    }
  }
}
