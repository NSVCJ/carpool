var Sequelize = require("sequelize");

var sequelize = null;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  // the application is executed on the local machine ... use mysql
  sequelize = new Sequelize('carpool', 'root', null)
}

var User = sequelize.define("User", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  phone: Sequelize.STRING,
  profilePicture: Sequelize.BLOB('long'),
  rating: Sequelize.FLOAT(4),
  ratingsCount: Sequelize.INTEGER
},{
  createdAt: false,
  updatedAt: false
});

var Trip = sequelize.define("Trip", {
  price: Sequelize.DECIMAL(7,2),
  eventfulId: Sequelize.STRING
});

var TripUser = sequelize.define("TripUser", {
  startLocation: Sequelize.STRING,
  role: Sequelize.STRING
});

Trip.belongsToMany(User, {through: TripUser});
User.belongsToMany(Trip, {through: TripUser});

User.sync();
Trip.sync();
TripUser.sync();

exports.User = User;
exports.Trip = Trip;
exports.TripUser = TripUser;
exports.sequelize = sequelize;
