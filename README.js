//-----------
//How to start the Database
//-----------
//
//Enter this into terminal
mysql.server start
mysql -u root //Logs you into mysql with username "root" and no password
create database carpool; //Must close all sql commands with semicolon!


//------------
//How to input Test Data (Only do this once or you'll get duplicates)
//------------
//
//Enter this into terminal
npm run data
//This will magically enter test data into your carpool mysql database.
//The test data is listed in server/spec/inputTestData.js
//There will be 4 events, users, and tripUsers in your mysql carpool database


//-----------
//How to test server integration
//-----------
//
//Enter this into terminal
npm run test
//This will test whether post and get requests for the MVP are working.




//------------
//How to post data from the DRIVER PAGE
//------------
//
//Use this address as your request url so our server can get it
req.url = localhost:3000/api/trips
//Post requests from Driver Page must send in data following this format
{
  "event": {}, //Object returned from eventful api call
  "user": {
    "name": "[NAME]", //String
    "email": "[EMAIL]", //String
    "phone": "[PHONE]" //String
  },
  "trip": {
    "price": 0.00, //Number (max is 9999.99)
    "lat": 90.00, //Number (Where the driver is starting from)
    "long": 90.00 //Number (Where the driver is starting from)
  }
}


//------------
//How to get data from the RIDER PAGE
//------------
//
//Use this address as your request url so our server can get it
req.url = localhost:3000/api/trips
//Get requests from Rider Page must also pass in a params object
params: {
  "eventfulId": "[ID]" //id value from eventful api event object
}
//OR instead of a params object, inputing your params into the url will work too
localhost:3000/api/trips?eventfulId=SingleDadMixer
//Test that your get requests are working by pluging in
//"SingleDadMixer" or "PlantPhotoGallery" as your eventfulId.
//
//The response to the get request will be an object containing an array called trips.
//This shows all the trips that are going to that event, including the
//lat, long, price, name, and contact info for the driver.
