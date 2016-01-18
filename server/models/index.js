var db = require("../db/db.js");
var serverHelpers = require("../server-helpers");
var bcrypt = require('bcrypt');
var _ = require('lodash');
var utils = require('../server-helpers/index.js');
var utilsTrips = require('../server-helpers/tripsHelpers.js');
//Someday, everything will break because I've confused camelCase
//with under_scores. You have been warned.

module.exports = models = {
  trips: {
    get: function(callback){
      console.log('inside models trips');
      utilsTrips.getTrips(callback);
    },
    post: function(){},
    put: function(){}
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
        "select TripUsers.TripId, TripUsers.startLocation, Trips.startTime, Trips.price, Trips.eventfulId from TripUsers, Trips where TripUsers.UserId = '"+params.UserId+"' AND TripUsers.role = 'Driver' AND TripUsers.TripId = Trips.id",
      {type: db.sequelize.QueryTypes.SELECT})
      .then(function(driverInfo){
        var queries = [];
        _.map(driverInfo, function(trip) {
          queries.push(
            db.sequelize.query(
              "select Users.id, Users.name, Users.role, Users.email, Users.phone, Users.profilePicture, Users.rating, TripUsers.startLocation AS 'pickupLocation' from Users, TripUsers where TripUsers.TripId = '"+trip.TripId+"' AND TripUsers.role <> 'Driver' AND TripUsers.UserId = Users.id",
            {type: db.sequelize.QueryTypes.SELECT})
          )
        })
        // Promise.all(queries)
        // .then(function(riderUnconfirmedInfo){
        //   var queries = [];
        //   _.map(driverInfo, function(trip) {
        //     queries.push(
        //       db.sequelize.query(
        //         "select Users.name, Users.email, Users.phone, Users.profilePicture, Users.rating, TripUsers.startLocation AS 'pickupLocation' from Users, TripUsers where TripUsers.role = 'Rider' AND TripUsers.TripId = '"+trip.TripId+"' AND TripUsers.UserId = Users.id",
        //       {type: db.sequelize.QueryTypes.SELECT})
        //     )
        //   })
          Promise.all(queries)
          .then(function(riderInfo) {
            console.log("What is our callback", callback);
            callback(driverInfo, riderInfo);
          })
        // })
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
        "select TripUsers.TripId, TripUsers.startLocation, Trips.price, Users.name AS driver, Users.email, Users.phone, Users.rating, Users.profilePicture from Trips, TripUsers, Users where eventfulId = '"+params.eventfulId+"' AND TripUsers.TripId = Trips.id AND TripUsers.role = 'Driver' AND Users.id = TripUsers.UserId",
      {type: db.sequelize.QueryTypes.SELECT})
      .then(function(data){
        callback(data);
      })
    },
    post: function(callback, data) {
      db.TripUser.create( {
          TripId: data.trip.TripId,
          startLocation: data.startLocation,
          UserId: data.user.id,
          role: 'Unconfirmed'
      }).then(function(rider){
        // console.log("+++line:87 with data", data)
        callback(rider);
      })
      .catch(function(err) {
        console.log("++++line:91 broke with data", data)
        console.log(err)
        if (err.name = 'SequelizeUniqueConstraintError') {
          console.log("I found you");
          callback(err.name);
        }
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
          startTime: data.trip.startTime,
          eventfulId: data.event.id
        }).then(function(trip) {
          tripUser = db.TripUser.create( {
            startLocation: data.trip.startLocation,
            role: "Driver",
            UserId: data.user.id,
            TripId: trip.id
          }).then(function(tripUser) {
            // console.log("+++line:119", data)
            callback({
              'user': data.user,
              'trip': trip,
              'tripUser': tripUser
            });
          })
          .catch(function(err) {
            console.log("++++line:126 broke with data", data)
            console.log(err)
          })
        });
      // });
    },
    put: function(callback, data) {}
  }
}
