
var Sequelize = require("sequelize")

var sequelize = new Sequelize("carpool", "root", "");

var User = sequelize.define("User", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  profilePicture: Sequelize.BLOB('long'),
  rating: Sequelize.FLOAT(4),
  numberOfRatings: Sequelize.INTEGER
});

var Trip = sequelize.define("Trip", {
  startTime: Sequelize.DATE(),
  price: Sequelize.DECIMAL(7,2)
})

Trip.belongsToMany(User, {through: 'TripUsers'});
User.belongsToMany(Trip, {through: 'TripUsers'});
