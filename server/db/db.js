var Sequelize = require("sequelize");

var orm = new Sequelize("carpool", "root", "");

var User = orm.define("User", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  profile_picture: Sequelize.BLOB('long'),
  rating: Sequelize.FLOAT(4),
  ratings_count: Sequelize.INTEGER
});

var Trip = orm.define("Trip", {
  start_time: Sequelize.DATE(),
  price: Sequelize.DECIMAL(7,2)
});

var Event = orm.define("Event", {
  name: Sequelize.STRING,
  location_lat: Sequelize.DECIMAL(20,18),
  location_long: Sequelize.DECIMAL(20,17),
  //Examine the api to know for sure
  start_time: Sequelize.DATE(),
  type: Sequelize.STRING,
  description: Sequelize.STRING
  //URL to more info?
  //URL to tickets?
});

var TripUser = orm.define("TripUser", {
  start_lat: Sequelize.DECIMAL(20,18),
  start_long: Sequelize.DECIMAL(20,17),
  role: Sequelize.STRING
});

Event.hasMany(Trip);

Trip.belongsToMany(User, {through: 'TripUser'});
User.belongsToMany(Trip, {through: 'TripUser'});

//Alternative Triple join table;
var EventUser = orm.define("EventUser", {});
EventUser.hasMany(Event);
EventUser.hasMany(User);
EventUser.hasMany(Trip);

// Trip.belongsToMany(User, {through: 'EventUser'});
// User.belongsToMany(Trip, {through: 'EventUser'});
// Event.belongToMany(User, {through: 'EventUser'});
//Triple Join is weird. Not recipricating all relationships, but I'm not sure if
//it's really necessary

User.sync();
Trip.sync();
Event.sync();
TripUser.sync();
EventUser.sync();

exports.User = User;
exports.Message = Trip;
exports.Event = Event;
exports.TripUser = TripUser;
exports.EventUser = EventUser;
