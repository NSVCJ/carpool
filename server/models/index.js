var db = require("../db/db.js");
var serverHelpers = require("../server-helpers");
//Someday, everything will break because I've confused camelCase
//with under_scores. You have been warned.

module.exports = models = {
  users:{
    get: function(){},
    post: function(){}
  },
  trips: {
    get: function(callback, params) {
      //console.log("Them params", params);
      db.sequelize.query(
        "select TripUsers.lat, TripUsers.long, Trips.price, Users.name, Users.email, Users.phone from Trips, TripUsers, Users where eventfulId = '"+params.eventfulId+"' AND TripUsers.TripId = Trips.id AND TripUsers.role = 'Driver' AND Users.id = TripUsers.UserId",
      {type: db.sequelize.QueryTypes.SELECT})
      .then(function(data){
        console.log("Inside models.trips.get", data);
        callback(data);
      })
    },
    riders: function(callback, params) {
      db.sequelize.query(
        "select TripUsers.TripId, TripUsers.lat, TripUsers.long, Trips.price, Trips.eventfulId from TripUsers, Trips where TripUsers.UserId"
      )
    },
    post: function(callback, data) {
      //console.log("Here is your post data", data);
      //MVP: no profile associated, so a new user is created for every post.
      //data must pass in info about driver, event, and trip
      //maybe data should be an object with each of those properties
      db.User.create( {
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone
      }).then(function(user) {
        db.Trip.create( {
          price: data.trip.price,
          eventfulId: data.event.id
        }).then(function(trip) {
          tripUser = db.TripUser.create( {
            lat: data.trip.lat,
            long: data.trip.long,
            role: "Driver",
            UserId: user.id,
            TripId: trip.id
          }).then(function(tripUser) {
            //console.log("TripUser:", tripUser); //see if I have setter functions
            callback({
              'user': user,
              'trip': trip,
              'tripUser': tripUser
            });
          });
          // tripUser.setUsers([user]); //not sure if setUser is a methods here
          // tripUser.setTrips([trip]);
          // tripUser.save();
        });
      });
    }
  }
}
