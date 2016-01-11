var db = require("../db");

var eventExist = function(eventName) {
  return db.Event.findAll({
    where: {
      name: eventName
    }
  });
}
