var request = require('request');
var expect = require('../../node_modules/chai/chai').expect;

//After each

describe('Serves Trip Requests', function() {

  it('should respond to GET requests for /log with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/api/trips', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send an object containing a `trips` array', function(done) {
    request('http://127.0.0.1:3000/api/trips', function(error, response, body) {
      parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.trips).to.be.an('array');
      done();
    });
  });

  it('should accept POST requests', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/api/trips',
      json: {
        "event": {
          "id": "TestParty"
        },
        "user": {
          "name": "Party Animal",
          "email": "google@google.com",
          "phone": "1-234-567-8900"
        },
        "trip": {
          "price": 50.00,
          "lat": 60.619324,
          "long": -158.554688
        }
      }
    };

    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should respond with the user, trip, and tripUser rows that were previously posted', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/api/trips',
      json: {
        "event": {
          "id": "SecondTestParty"
        },
        "user": {
          "name": "Me",
          "email": "something@gmail.com",
          "phone": "0010100110"
        },
        "trip": {
          "price": 50.00,
          "lat": 60.619324,
          "long": -158.554688
        }
      }
    };
    console.log("Before Post request");
    request(requestParams, function(error, response, body) {
      var posted = JSON.parse(body).posted;
      console.log("Posted: ", posted);
      expect(posted.user.name).to.equal('Me');
      expect(posted.trip.price).to.equal(50.00);
      expect(posted.tripUser.long).to.equal(-158.554688);
      request('http://127.0.0.1:3000/api/trips?eventfulId=SecondTestParty', function(error, response, body) {
          console.log("Inside second request");
          done();
        });
    });
  });

});
