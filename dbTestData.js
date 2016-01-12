//How to start Server
//
//Enter this into terminal
mysql.server start
mysql -u root
create database carpool


//DRIVER PAGE
//
req.url = localhost:3000/api/trips
// Post requests from Driver Page must send in data following this format
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


//RIDER PAGE
//
//Get requests from Rider Page must pass in a params object
req.url = localhost:3000/api/trips
params: {
  "eventfulId": "SpecialEventId" //id value from eventful api event object
}
//The response to the get request will be an object with an array called Test
//This shows all the trips that are going to that event. The lat, long, price, name,
//and contact info for the driver
{
  "trips": [
    {
      "lat": 90,
      "long": 90,
      "price": 20,
      "name": "Nick",
      "email": "nick@nick.com",
      "phone": "1-800-555-5555"
    },
    {
      "lat": 0,
      "long": 0,
      "price": 1000,
      "name": "VJ",
      "email": "vj@nick.com",
      "phone": "1-800-553-3359"
    },
    {
      "lat": 33,
      "long": 66,
      "price": 0.02,
      "name": "Sean Connery",
      "email": "seansean@nick.com",
      "phone": "911"
    }
  ]
}



//Test data
//
//Postman url is
localhost:3000/api/trips
//Plug this object into Postman (One at a time)
{
  "event": {
    "id": "SpecialEventId"
  },
  "user": {
    "name": "Nick",
    "email": "nick@nick.com",
    "phone": "1-800-555-5555"
  },
  "trip": {
    "price": 20.00,
    "lat": 90.00,
    "long": 90.00
  }
}

{
  "event": {
    "id": "SpecialEventId"
  },
  "user": {
    "name": "VJ",
    "email": "vj@nick.com",
    "phone": "1-800-553-3359"
  },
  "trip": {
    "price": 1000.00,
    "lat": 0.00,
    "long": 0.00
  }
}
{
  "event": {
    "id": "SpecialEventId"
  },
  "user": {
    "name": "Sean Connery",
    "email": "seansean@nick.com",
    "phone": "911"
  },
  "trip": {
    "price": 0.02,
    "lat": 33.00,
    "long": 66.00
  }
}
{
  "event": {
    "id": "My birthday Party"
  },
  "user": {
    "name": "Me",
    "email": "none",
    "phone": "867-5309"
  },
  "trip": {
    "price": 3.50,
    "lat": 50.00,
    "long": 50.00
  }
}
