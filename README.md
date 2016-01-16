<h5> Look at ProfileViewREADME.md for info specifically for the Profile PAge </h5>

---
How to start the Database
---

<h5>Enter this into terminal:</h5>
**`mysql.server start`<br>
`mysql -u root`** *Logs you into mysql with username "root" and no password* <br>
**`create database carpool`** *Must close all sql commands with semicolon!*


---
How to input Test Data (Only do this once or you'll get duplicates)
---
<h5>Enter this into terminal:</h5>
**`npm run data`** <br>
This will magically enter test data into your carpool mysql database.
The test data is listed in server/spec/inputTestData.js
There will be 4 events, users, and tripUsers in your mysql carpool database.*


---
How to POST data from the DRIVER EVENT page
---
*Sign up as a driver for the event you clicked on!*

*Use this address as your request url so our server can get it* <br>
**`req.url = localhost:<PORT>/api/eventDriver`**<br>
*Post requests from Driver Page must send in data following this format* <br>

```javascript
{
  "event": {}, //Object returned from eventful api call
  "user": {}, //User object from local storage that contains key "id"
  "trip": {
    "price": 0.00, //Number (max is 9999.99)
    "startLocation" : "1542 Harper Ave, Redondo Beach, CA" //Address String from google maps
  }
}
```

---
How to GET data from the RIDER EVENT page
---
*Get a list of all the rides going to event you clicked on!*

*Use this address as your request url so our server can get it* <br>
**`req.url = localhost:<PORT>/api/eventRider`** <br>
*Get requests from Rider Page must also pass in a params object*
```javascript
params: {
  "eventfulId": "[ID]" //id value from eventful api event object
}
```

*OR instead of a params object, inputing your params into the url will work too*
**`localhost:<PORT>/api/trips?eventfulId=SingleDadMixer`** <br>
*Test that your get requests are working by plugging in*
1. "SingleDadMixer"
2. "PlantPhotoGallery"
3. "HotDogEatingContest"
4. "LakersGame"
5. "Hackathon"
*as your eventfulId. The response to the get request will be an object containing an array called trips. The trips array will show all the info for trips going to that event. Here's what the response's returned data will look like:*
```javascript
{
  "trips": [
    {
      "TripId": 1,
      "startLocation": "1600 Pennsylvania Ave NW, Washington, DC 20500",
      "price": 20,
      "driver": "Barack Obama",
      "email": "bo@whitehouse.gov",
      "phone": "434-231-9008"
    },
    {
      "TripId": 2,
      "startLocation": "1542 Harper Ave, Redondo Beach, CA",
      "price": 1000,
      "driver": "Bob Loblaw",
      "email": "bow@loblaw.com",
      "phone": "555-555-5555"
    },
    {
      "TripId": 3,
      "startLocation": "604 Arizona Ave #238, Santa Monica, CA 90401",
      "price": 0.02,
      "driver": "Tom Hardy",
      "email": "tom@hardy.com",
      "phone": "208-208-3945"
    }
  ]
}
```


---
How to POST data from the RIDER EVENT page
---
*Request to be rider for a trip you clicked on! (Sends post request to database to assign you as "Unconfirmed" for the trip.)*

*Use this address as your request url so our server can get it* <br>
**`req.url = localhost:<PORT>/api/eventRider`**<br>
*Post requests from Rider Event page must send in data following this format* <br>
```javascript
{
  "user": {}, //User object from local storage that contains key "id"
  "trip": {}, //trip object that user clicked on that contains key "TripId"
  "startLocation" : "1542 Harper Ave, Redondo Beach, CA" //Address String from google maps, this is where the rider want to be picked up.
  }
}
```
*If you try to request to be a rider for the same trip twice, you'll get this in the response.*
```javascript
{
  "posted": "SequelizeUniqueConstraintError"
}
```


---
How to test server integration
---

<h5>Enter this into terminal:</h5>
**`npm run test`** <br>
*This will test whether post and get requests for the MVP are working.*
