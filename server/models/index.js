var db = require("../db/db.js");
var serverHelpers = require("../server-helpers");
var bcrypt = require('bcrypt');
var _ = require('lodash');
var utils = require('../server-helpers');
//Someday, everything will break because I've confused camelCase
//with under_scores. You have been warned.

module.exports = models = {

  //Will be depreciated after MVP
  trips: {
    get: function(callback, params) {
      db.sequelize.query(
        "select TripUsers.TripId, TripUsers.startLocation, Trips.price, Users.name, Users.email, Users.phone from Trips, TripUsers, Users where eventfulId = '"+params.eventfulId+"' AND TripUsers.TripId = Trips.id AND TripUsers.role = 'Driver' AND Users.id = TripUsers.UserId",
      {type: db.sequelize.QueryTypes.SELECT})
      .then(function(data){
        console.log("Inside models.trips.get", data);
        callback(data);
      })
    },
    post: function(callback, data) {
      //MVP: no profile associated, so a new user is created for every post.
      // db.User.create( {
      //   name: data.user.name,
      //   email: data.user.email,
      //   phone: data.user.phone
      // }).then(function(user) {
      console.log("WHAT IS INSIDE DATAAAAAA", data);
        db.Trip.create( {
          price: data.trip.price,
          eventfulId: data.event.id
        }).then(function(trip) {
          tripUser = db.TripUser.create( {
            startLocation: data.trip.startLocation,
            role: "Driver",
            UserId: data.user.id,
            TripId: trip.id
          }).then(function(tripUser) {
            callback({
              'user': data.user,
              'trip': trip,
              'tripUser': tripUser
            });
          });
        });
      // });
    },
    put: function(callback, data) {}
  },

  riderProfile: {
    get: function(callback, params) {
      utils.getConfirmedRiders(function(riderInfo, driverInfo){
        utils.riderConfirmedFormat(riderInfo, driverInfo,
          function(confirmedTrips) {
            utils.getUnconfirmedRiders(function(riderInfo, driverInfo) {
              utils.riderUnconfirmedFormat(riderInfo, driverInfo,
                function(unconfirmedTrips) {
                  callback(confirmedTrips, unconfirmedTrips)
                }
              )
            }, params)
          }
        )
      }, params)
    },
    post: function(){},
    put: function(callback, data) {}
  },

  driverProfile: {
    get: function(callback, params) {
      //Get all trips where logged-in user is driving.
      db.sequelize.query(
        "select TripUsers.TripId, TripUsers.startLocation, Trips.price, Trips.eventfulId from TripUsers, Trips where TripUsers.UserId = '"+params.UserId+"' AND TripUsers.role = 'Driver' AND TripUsers.TripId = Trips.id",
      {type: db.sequelize.QueryTypes.SELECT})
      .then(function(driverInfo){
        var queries = [];
        _.map(driverInfo, function(trip) {
          queries.push(
            db.sequelize.query(
              "select Users.name, Users.email, Users.phone, Users.profilePicture, Users.rating, TripUsers.startLocation AS 'pickupLocation' from Users, TripUsers where TripUsers.TripId = '"+trip.TripId+"' AND TripUsers.role = 'Unconfirmed' AND TripUsers.UserId = Users.id",
            {type: db.sequelize.QueryTypes.SELECT})
          )
        })
        Promise.all(queries)
        .then(function(riderUnconfirmedInfo){
          var queries = [];
          _.map(driverInfo, function(trip) {
            queries.push(
              db.sequelize.query(
                "select Users.name, Users.email, Users.phone, Users.profilePicture, Users.rating, TripUsers.startLocation AS 'pickupLocation' from Users, TripUsers where TripUsers.role = 'Rider' AND TripUsers.TripId = '"+trip.TripId+"' AND TripUsers.UserId = Users.id",
              {type: db.sequelize.QueryTypes.SELECT})
            )
          })
          Promise.all(queries)
          .then(function(riderConfirmedInfo) {
            console.log("What is our callback", callback);
            callback(driverInfo, riderConfirmedInfo, riderUnconfirmedInfo);
          })
        })
      })
    },
    put: utils.toggleConfirm,
    //Change rider status of a rider on your trip
    post: function(){}
  },

  eventRider: {
    //Get all Drivers for an event
    //For use on event-Rider page
    get: function(callback, params) {
      db.sequelize.query(
        "select TripUsers.TripId, TripUsers.startLocation, Trips.price, Users.name, Users.email, Users.phone from Trips, TripUsers, Users where eventfulId = '"+params.eventfulId+"' AND TripUsers.TripId = Trips.id AND TripUsers.role = 'Driver' AND Users.id = TripUsers.UserId",
      {type: db.sequelize.QueryTypes.SELECT})
      .then(function(data){
        callback(data);
      })
    },
    post: function(callback, data) {
      db.TripUser.create( {
          TripId: data.trips.tripId,
          startLocation: data.startLocation,
          UserId: data.user.id,
          role: 'Unconfirmed'
      }).then(function(rider){
        callback(rider);
      })
    },
    put: function(callback, data) {}
  },

  eventDriver: {
    get: function(callback, data) {},
    post: function(callback, data) {
      //Post that you want to be a driver for an event/
      //For use on event-Driver page
      //MVP: no profile associated, so a new user is created for every post.
      // db.User.create( {
      //   name: data.user.name,
      //   email: data.user.email,
      //   phone: data.user.phone
      // }).then(function(user) {
        db.Trip.create( {
          price: data.trip.price,
          eventfulId: data.event.id
        }).then(function(trip) {
          tripUser = db.TripUser.create( {
            startLocation: data.trip.startLocation,
            role: "Driver",
            UserId: user.id,
            TripId: trip.id
          }).then(function(tripUser) {
            callback({
              'user': user,
              'trip': trip,
              'tripUser': tripUser
            });
          });
        });
      // });
    },
    put: function(callback, data) {}
  }
}
