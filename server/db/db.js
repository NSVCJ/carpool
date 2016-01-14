var Sequelize = require("sequelize");

var sequelize = null;
if (process.env.DATABASE_UR) {
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  console.log('+++line5 match: ', match);
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(match[5],match[1],match[2],{
    dialect: 'postgres',
    protocol: 'postgres',
    host: match[3],
    logging: false,
    port: match[4],
    dialectOptions: {
        ssl: true
    }
  })
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

Trip.belongsToMany(User, {through: 'TripUsers'});
User.belongsToMany(Trip, {through: 'TripUsers'});

User.sync();
Trip.sync();
TripUser.sync();

exports.User = User;
exports.Trip = Trip;
exports.TripUser = TripUser;
exports.sequelize = sequelize;
