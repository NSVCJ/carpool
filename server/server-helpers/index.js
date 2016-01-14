var db = require("../db/db.js");
var _ = require('lodash');

var eventExist = function(eventId) {
  return db.Event.findAll({
    where: {
      eventful_id: eventId
    }
  });
}

var riderConfirmedFormat = function(riderInfo, driverInfo) {

}

exports.riderUnconfirmedFormat = function(riderInfo, driverInfo) {
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
  return riderUnconfirmedArr;
}
