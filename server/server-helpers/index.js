var db = require("../db/db.js");

var eventExist = function(eventId) {
  return db.Event.findAll({
    where: {
      eventful_id: eventId
    }
  });
}
