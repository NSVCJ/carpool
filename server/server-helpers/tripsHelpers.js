var db = require("../db/db.js");

exports.getTrips = function(callback){
  console.log('inside tripsHelpers')
  db.sequelize.query(
    "select distinct eventfulId from trips",{type: db.sequelize.QueryTypes.SELECT})
  .then(function(data){
    console.log(data);
    callback(data);
  })
}
