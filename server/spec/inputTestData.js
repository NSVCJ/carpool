var request = require('request');
//var app = require('../app.js').app;
var _ = require('lodash');

var testData = [
  {
    "event": {
      "id": "SingleDadMixer"
    },
    "user": {
      "name": "Steve Jobs",
      "email": "steve@apple.com",
      "phone": "1-800-555-5555"
    },
    "trip": {
      "price": 20.00,
      "lat": 90.00,
      "long": 90.00
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
      "lat": 0.00,
      "long": 0.00
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
      "lat": 33.00,
      "long": 66.00
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
      "lat": 50.00,
      "long": 50.00
    }
  }
];

_.each(testData, function(json) {
  request({
    method: 'POST',
    uri: 'http://127.0.0.1:3000/api/trips',
    json: json
  }, function(error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    };
    console.log('Upload successful!  Server responded with:', body);
  });
});
