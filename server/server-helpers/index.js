var db = require("../db/db.js");
var _ = require('lodash');

var eventExist = function(eventId) {
  return db.Event.findAll({
    where: {
      eventful_id: eventId
    }
  });
}

exports.riderConfirmedFormat = function(riderInfo, driverInfo, callback) {
  var confirmedTrips = [];
  _.each(riderInfo, function(trip, index){
    var driver = driverInfo[index][0];
    confirmedTrips.push({
      TripId: trip.TripId,
      pickupLocation: trip.startLocation,
      price: trip.price,
      eventfulId: trip.eventfulId,
      driverName: driver.name,
      driverEmail: driver.email,
      driverPhone: driver.phone,
      driverRating: driver.rating,
      driverProfilePicture: driver.profilePicture,
      driverStartLocation: driver.startLocation
    });
  });
  callback(confirmedTrips);
}

exports.riderUnconfirmedFormat = function(riderInfo, driverInfo, callback) {
  var riderUnconfirmedArr = [];
  _.each(riderInfo, function(trip, index){
    var riderUnconfirmedObj = {};
    riderUnconfirmedObj.TripId = trip.TripId;
    riderUnconfirmedObj.pickupLocation = trip.startLocation;
    riderUnconfirmedObj.price = trip.price;
    riderUnconfirmedObj.eventfulId = trip.eventfulId;
    riderUnconfirmedObj.driverName = driverInfo[index][0].name;
    riderUnconfirmedObj.driverRating = driverInfo[index][0].rating;
    riderUnconfirmedObj.driverProfilePicture = driverInfo[index][0].profilePicture;
    riderUnconfirmedObj.driverStartLocation = driverInfo[index][0].startLocation;
    riderUnconfirmedArr.push(riderUnconfirmedObj);
  });
  callback(riderUnconfirmedArr);
}

exports.driverProfileFormat = function(driverInfo, riderConfirmedInfo, riderUnconfirmedInfo) {
  var driverProfileArr = [];
  _.each(driverInfo, function(trip, index){
    var driverProfileObj = {};
    driverProfileObj.TripId = trip.TripId;
    driverProfileObj.eventfulId = trip.eventfulId;
    driverProfileObj.startLocation = trip.startLocation;
    var pending = riderUnconfirmedInfo[index];
    driverProfileObj.unconfirmedRiders = riderUnconfirmedInfo[index];
    driverProfileObj.confirmedRiders = riderConfirmedInfo[index];
    driverProfileArr.push(driverProfileObj);
  });
  return driverProfileArr;
}

exports.toggleConfirm = function(callback, data) {
  db.sequelize.query(
    "select role from TripUsers where TripId = "+data.TripId+" AND UserId = "+data.UserId,
  {type: db.sequelize.QueryTypes.SELECT})
  .then(function(role) {
    var newRole = "Unconfirmed";
    if (role[0].role === "Unconfirmed") {
      newRole = "Rider"
    }
    db.sequelize.query(
      "update TripUsers set role ='"+newRole+"' where TripId = "+data.TripId+" AND UserId = "+data.UserId,
    {type: db.sequelize.QueryTypes.UPDATE})
    .then(function(record) {
      callback(newRole);
    })
  })
}

exports.getConfirmedRiders = function(callback, params) {
  db.sequelize.query(
    "select TripUsers.TripId, TripUsers.startLocation, Trips.price, Trips.eventfulId from TripUsers, Trips where TripUsers.UserId = '"+params.UserId+"' AND TripUsers.role = 'Rider' AND TripUsers.TripId = Trips.id",
  {type: db.sequelize.QueryTypes.SELECT})
  .then(function(riderInfo){
    var queries = [];
    _.map(riderInfo, function(trip) {
      queries.push(db.sequelize.query(
        "select Users.name, Users.email, Users.phone, Users.rating, Users.profilePicture, TripUsers.startLocation from Users, TripUsers where TripUsers.TripId = '"+trip.TripId+"' AND TripUsers.role = 'Driver' AND TripUsers.UserId = Users.id",
      {type: db.sequelize.QueryTypes.SELECT})
    )})
    Promise.all(queries)
    .then(function(driverInfo){
      callback(riderInfo, driverInfo);
    })
  })
}

exports.getUnconfirmedRiders = function(callback, params) {
  db.sequelize.query(
    "select TripUsers.TripId, TripUsers.startLocation, Trips.price, Trips.eventfulId from TripUsers, Trips where TripUsers.UserId = '"+params.UserId+"' AND TripUsers.role = 'Unconfirmed' AND TripUsers.TripId = Trips.id",
  {type: db.sequelize.QueryTypes.SELECT})
  .then(function(riderInfo){
    var queries = [];
    _.map(riderInfo, function(trip) {
      queries.push(db.sequelize.query(
        "select Users.name, Users.rating, Users.profilePicture, TripUsers.startLocation from Users, TripUsers where TripUsers.TripId = '"+trip.TripId+"' AND TripUsers.role = 'Driver' AND TripUsers.UserId = Users.id",
      {type: db.sequelize.QueryTypes.SELECT})
    )});
    Promise.all(queries)
    .then(function(driverInfo){
      callback(riderInfo, driverInfo);
    })
  })
}
