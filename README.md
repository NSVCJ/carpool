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
How to test server integration
---

<h5>Enter this into terminal:</h5>
**`npm run test`** <br>
*This will test whether post and get requests for the MVP are working.*


---
How to post data from the DRIVER PAGE
---

*Use this address as your request url so our server can get it* <br>
**`req.url = localhost:<PORT>/api/trips`**<br>
*Post requests from Driver Page must send in data following this format* <br>

```javascript
{
  "event": {}, //Object returned from eventful api call
  "user": {
    "name": "[NAME]", //String
    "email": "[EMAIL]", //String
    "phone": "[PHONE]" //String
  },
  "trip": {
    "price": 0.00, //Number (max is 9999.99)
    "startLocation" : "1542 Harper Ave, Redondo Beach, CA" //Address String from google maps
  }
}
```

---
How to get data from the RIDER PAGE
---

*Use this address as your request url so our server can get it* <br>
**`req.url = localhost:<PORT>/api/trips`** <br>
*Get requests from Rider Page must also pass in a params object*
```javascript
params: {
  "eventfulId": "[ID]" //id value from eventful api event object
}
```

*OR instead of a params object, inputing your params into the url will work too*
**`localhost:<PORT>/api/trips?eventfulId=SingleDadMixer`** <br>
*Test that your get requests are working by pluging in
"SingleDadMixer" or "PlantPhotoGallery" as your eventfulId. The response to the get request will be an object containing an array called trips. The trip array will show all the info for trips going to that event. Here's what the response's returned data will look like:*
```javascript
{
  trips: [
    {
      "startLocation": "[ADDRESS]", //Start location of the driver for the trip
      "price": 20.00, //Price of the trip
      "name": "Bob", //Name of the Driver for the Trip
      "email": "email@email.com",// String
      "phone": "1234123",// String
      "rating": "",//null for now
      "profilePicture": "", //null for now
      "ratingsCount": "", //null for now
    },
    {
      "startLocation": "[ADDRESS]"
      //etc...
    },
    //etc...
  ]
}
```
