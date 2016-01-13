var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'carpool'
});

connection.connect();

connection.query('DELETE FROM Users, Trips, TripUsers WHERE (Trips.eventfulId = "TestParty" OR Trips.eventfulId = "SecondTestParty") AND TripUsers.TripId = Trips.id AND Users.id = TripUsers.UserId', function (error, result) {
  if (error) {
    throw error;
  }
  console.log('deleted ' + result.affectedRows + ' rows');
});

connection.end();
