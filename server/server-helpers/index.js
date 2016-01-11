var db = require("../db");

var eventExist = function(eventId) {
  return db.Event.findAll({
    where: {
      eventful_id: eventId
    }
  });
}
