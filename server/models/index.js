var db = require("../db/db.js");
var serverHelpers = require("../server-helpers");
var bcrypt = require('bcrypt');
//Someday, everything will break because I've confused camelCase
//with under_scores. You have been warned.

module.exports = models = {
  signin:{
    get: function(){},
    post: function(){

    }
  },
  signup:{
    get: function(){},
    post: function(){

    }
  },
  users:{
    get: function(){},
    post: function(){}
  },
  riderConfirmed: {
    get: function(callback, params) {
      db.sequelize.query(
        "select TripUsers.TripId, TripUsers.startLocation, Trips.price, Trips.eventfulId from TripUsers, Trips where TripUsers.UserId = '"+params.UserId+"' AND TripUsers.role = 'Rider' AND TripUsers.TripId = Trips.id",
      {type: db.sequelize.QueryTypes.SELECT})
      .spread(function(riderInfo){
        var queries = riderInfo.map(function(trip) {
          db.sequelize.query(
            "select Users.name, Users.email, Users.phone, Users.rating, Users.profilePicture, TripUsers.startLocation from Users, TripUsers where TripUsers.TripId = '"+trip.TripId+"' AND TripUsers.role = 'Driver'",
          {type: db.sequelize.QueryTypes.SELECT})
        })
        Promise.all(queries)
        .then(function(driverInfo){
          callback(riderInfo, driverInfo);
        })
      })
    },
    post: function(){}
  },

  riderUnconfirmed: {
    get: function(callback, params) {
      db.sequelize.query(
        "select TripUsers.TripId, TripUsers.startLocation, Trips.price, Trips.eventfulId from TripUsers, Trips where TripUsers.UserId = '"+params.UserId+"' AND TripUsers.role = 'Unconfirmed' AND TripUsers.TripId = Trips.id",
      {type: db.sequelize.QueryTypes.SELECT})
      .spread(function(riderInfo){
        var queries = riderInfo.map(function(trip) {
          db.sequelize.query(
            "select Users.name, Users.rating, Users.profilePicture, TripUsers.startLocation from Users, TripUsers where TripUsers.TripId = '"+trip.TripId+"' AND TripUsers.role = 'Driver'",
          {type: db.sequelize.QueryTypes.SELECT})
        })
        Promise.all(queries)
        .then(function(driverInfo){
          callback(riderInfo, driverInfo);
        })
      })
    },
    post: function(){}
  },

  driverConfirmed: {
    get: function(callback, params) {
      db.sequelize.query(
        "select TripUsers.TripId, TripUsers.startLocation, Trips.price, Trips.eventfulId from TripUsers, Trips where TripUsers.UserId = '"+params.UserId+"' AND TripUsers.role = 'Driver' AND TripUsers.TripId = Trips.id",
      {type: db.sequelize.QueryTypes.SELECT})
      .spread(function(driverInfo){
        var queries = riderInfo.map(function(trip) {
          db.sequelize.query(
            "select Users.name, Users.email, Users.phone, Users.rating, Users.profilePicture, TripUsers.startLocation from Users, TripUsers where TripUsers.TripId = '"+trip.TripId+"' AND TripUsers.role = 'Rider'",
          {type: db.sequelize.QueryTypes.SELECT})
        })
        Promise.all(queries)
        .then(function(riderInfo){
          callback(riderInfo, driverInfo);
        })
      })
    },
    post: function(){}
  },

  driverUnconfirmed: {
    get: function(callback, params) {
      db.sequelize.query(
        "select TripUsers.TripId, TripUsers.startLocation, Trips.price, Trips.eventfulId from TripUsers, Trips where TripUsers.UserId = '"+params.UserId+"' AND TripUsers.role = 'Driver' AND TripUsers.TripId = Trips.id",
      {type: db.sequelize.QueryTypes.SELECT})
      .spread(function(driverInfo){
        var queries = riderInfo.map(function(trip) {
          db.sequelize.query(
            "select Users.*, TripUsers.startLocation from Users, TripUsers where TripUsers.TripId = '"+trip.TripId+"' AND TripUsers.role = 'Unconfirmed'",
          {type: db.sequelize.QueryTypes.SELECT})
        })
        Promise.all(queries)
        .then(function(riderInfo){
          callback(riderInfo, driverInfo);
        })
      })
    },
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
      //To be continued once the rider form is completed
      db.TripUser.create( {
          TripId: data.trips.tripId,
          startLocation: data.startLocation,
          UserId: data.user.id,
          role: 'Unconfirmed'
      }).then(function(rider){
        callback(rider);
      })
    }
  },

  eventDriver: {
    //Post that you want to be a driver for an event/
    //For use on event-Driver page
    get: function(callback, data) {},
    post: function(callback, data) {
      //MVP: no profile associated, so a new user is created for every post.
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
      });
    }
  },
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
      });
    }
  }
}
