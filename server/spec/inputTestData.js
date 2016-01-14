var request = require('request');
var _ = require('lodash');

var testData = [
  {
    "event": {
      "id": "SingleDadMixer"
    },
    "user": {
      "name": "Barack Obama",
      "email": "bo@gmail.com",
      "phone": "1-800-555-5555"
    },
    "trip": {
      "price": 20.00,
      "startLocation": "1600 Pennsylvania Ave NW, Washington, DC 20500"
    }
  },
  {
    "event": {
      "id": "SingleDadMixer"
    },
    "user": {
      "name": "Job Steves",
      "email": "job@apple.com",
      "phone": "1-310-903-3359"
    },
    "trip": {
      "price": 1000.00,
      "startLocation": "1542 Harper Ave, Redondo Beach, CA"
    }
  },
  {
    "event": {
      "id": "SingleDadMixer"
    },
    "user": {
      "name": "Sean Connery",
      "email": "sean@sean.com",
      "phone": "911"
    },
    "trip": {
      "price": 0.02,
      "startLocation": "Scotland"
    }
  },
  {
    "event": {
      "id": "PlantPhotoGallery"
    },
    "user": {
      "name": "Hugo",
      "email": "none",
      "phone": "867-5309"
    },
    "trip": {
      "price": 3.50,
      "startLocation": "the middle of the street"
    }
  }
];

_.each(testData, function(json) {
  request({
    method: 'POST',
    uri: 'http://127.0.0.1:8000/api/trips',
    json: json
  }, function(error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    console.log('Upload successful!  Server responded with:', body);
  });
});
