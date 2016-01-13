var Sequelize = require("sequelize");

var sequelize = null;

if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging:  true //false
  })
} else {
  // the application is executed on the local machine ... use mysql
  sequelize = new Sequelize('carpool', 'root', null)
}

var User = sequelize.define("User", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  profilePicture: Sequelize.BLOB('long'),
  rating: Sequelize.FLOAT(4),
  ratingsCount: Sequelize.INTEGER
});

var Trip = sequelize.define("Trip", {
  price: Sequelize.DECIMAL(7,2),
  eventfulId: Sequelize.STRING
});

// var Event = sequelize.define("Event", {
//   eventful_id: Sequelize.STRING,
//   name: Sequelize.STRING,
//   location_lat: Sequelize.DECIMAL(20,18),
//   location_long: Sequelize.DECIMAL(20,17),
//   //Examine the api to know for sure
//   start_time: Sequelize.DATE(),
//   type: Sequelize.STRING,
//   description: Sequelize.STRING
//   //URL to more info?
//   //URL to tickets?
// });

var TripUser = sequelize.define("TripUser", {
  lat: Sequelize.DECIMAL(20,18),
  long: Sequelize.DECIMAL(20,17),
  role: Sequelize.STRING
});

//Event.hasMany(Trip);

Trip.belongsToMany(User, {through: 'TripUser'});
User.belongsToMany(Trip, {through: 'TripUser'});


//Alternative Triple join table;
// var EventUser = sequelize.define("EventUser", {});
// EventUser.hasMany(Event);
// EventUser.hasMany(User);
// EventUser.hasMany(Trip);

// Trip.belongsToMany(User, {through: 'EventUser'});
// User.belongsToMany(Trip, {through: 'EventUser'});
// Event.belongToMany(User, {through: 'EventUser'});
//Triple Join is weird. Not recipricating all relationships, but I'm not sure if
//it's really necessary

//Or we could not.

User.sync();
Trip.sync();
//Event.sync();
TripUser.sync();
//EventUser.sync();

exports.User = User;
exports.Trip = Trip;
//exports.Event = Event;
exports.TripUser = TripUser;
//exports.EventUser = EventUser;
exports.sequelize = sequelize;
