var request = require('request');
var expect = require('../../node_modules/chai/chai').expect;

//Delete new entry after each

describe('Serves Trip Requests', function() {

  it('should respond to GET requests for /log with a 200 status code', function(done) {
    request('http://127.0.0.1:8000/api/trips', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send an object containing a `trips` array', function(done) {
    request('http://127.0.0.1:8000/api/trips', function(error, response, body) {
      parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.trips).to.be.an('array');
      done();
    });
  });

  it('should accept POST requests', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:8000/api/trips',
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
          "startLocation": "1600 Pennsylvania Ave NW, Washington, DC 20500"
        }
      }
    };

    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      //var posted = JSON.parse(body).posted;
      done();
    });
  });

  it('should respond with the user, trip, and tripUser rows that were previously posted', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:8000/api/trips',
      json: {
        'event': {
          "id": "SecondTestParty"
        },
        "user": {
          "name": "Me",
          "email": "something@gmail.com",
          "phone": "0010100110"
        },
        "trip": {
          "price": 50.00,
          "startLocation": "1600 Pennsylvania Ave NW, Washington, DC 20500"
        }
      }
    };
    console.log("Before Post request");
    request(requestParams, function(error, response, body) {
      //var posted = JSON.parse(body).posted;
      var posted = body.posted;
      expect(posted.user.name).to.equal('Me');
      expect(posted.trip.price).to.equal(50.00);
      expect(posted.tripUser.startLocation).to.equal("1600 Pennsylvania Ave NW, Washington, DC 20500");
      request('http://127.0.0.1:8000/api/trips?eventfulId=SecondTestParty', function(error, response, body) {
        parsedBody = JSON.parse(body);
        expect(parsedBody.trips[0].name).to.equal('Me');
        expect(parsedBody.trips[0].price).to.equal(50.00);
        expect(parsedBody.trips[0].startLocation).to.equal("1600 Pennsylvania Ave NW, Washington, DC 20500");
        done();
      });
    });
  });

});
