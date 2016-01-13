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

var TripUser = sequelize.define("TripUser", {
  startLocation: Sequelize.STRING,
  role: Sequelize.STRING
});

Trip.belongsToMany(User, {through: 'TripUser'});
User.belongsToMany(Trip, {through: 'TripUser'});

User.sync();
Trip.sync();
TripUser.sync();

exports.User = User;
exports.Trip = Trip;
exports.TripUser = TripUser;
exports.sequelize = sequelize;
