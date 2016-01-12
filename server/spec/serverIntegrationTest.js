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
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.results).to.be.an('array');
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
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should respond with the user, trip, and tripUser that were previously posted', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/api/trips',
      json: {
        "event": {
          "id": "TestParty"
        },
        "user": {
          "name": "Me",
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
      request('http://127.0.0.1:3000/api/trips', function(error, response, body) {
          var trips = JSON.parse(body).results;
          expect(trips[0].user.name).to.equal('Me');
          expect(trips[0].trip.price).to.equal(50.00);
          expect(trips[0].trip.price).to.equal(50.00);
          done();
        });
    });
  });
