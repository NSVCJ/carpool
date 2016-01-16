---
Profile View Get Requests
---

There are 3 things the Profile View needs from the database

1. Info about trips where I'm a Rider
2. Info about trips where I'm a Driver
3. Toggle the confirmation status of your riders when you're a Driver

You need to specify a route for each get request

1. api/riderProfile
2. api/driverProfile
3. api/driverProfile

This guide will walk you through how to make each of those get requests.

---
1. Info about trips where I'm a Rider
---

*Use this address as your request url* <br>
**`req.url = localhost:<PORT>/api/riderProfile`** <br>
*You must pass in a params object containing your UserId. That information will be available from authentication.*
```javascript
params: {
  "UserId": "[ID]"
}
```
*Or you can pass in the params in the request url* <br>
**`req.url = localhost:<PORT>/api/riderProfile?UserId=<ID>`** <br>

*In response, you will get an object that looks like this:*
```javascript
{
  {
    "confirmed": [
      {
        "TripId": 5,
        "pickupLocation": "1600 Pennsylvania Ave NW, Washington, DC 20500",
        "price": 30,
        "eventfulId": "HotDogEatingContest",
        "driverName": "Sam Samerston",
        "driverRating": null,
        "driverProfilePicture": null,
        "driverStartLocation": "1218 3rd St"
      }
    ],
    "unconfirmed": [
      {
        "TripId": 6,
        "pickupLocation": "1600 Pennsylvania Ave NW, Washington, DC 20500",
        "price": 30,
        "eventfulId": "LakersGame",
        "driverName": "Alice Kingsley",
        "driverRating": null,
        "driverProfilePicture": null,
        "driverStartLocation": "4718 Admiralty Way"
      },
      {
        "TripId": 7,
        "pickupLocation": "1600 Pennsylvania Ave NW, Washington, DC 20500",
        "price": 30,
        "eventfulId": "Hackathon",
        "driverName": "Peggy Carter",
        "driverRating": null,
        "driverProfilePicture": null,
        "driverStartLocation": "4114 Sepulveda Blvd"
      }
    ]
  }
}
```
---
2. Info about trips where I'm a Driver
---

*Use this address as your request url* <br>
**`req.url = localhost:<PORT>/api/driverProfile`** <br>
*You must pass in a params object containing your UserId. That information will be available from authentication.*
```javascript
params: {
  "UserId": "[ID]"
}
```
*Or you can pass in the params in the request url* <br>
**`req.url = localhost:<PORT>/api/driverProfile?UserId=<ID>`** <br>

*In response, you will get an object that looks like this:*
```javascript
{
  "trips": [
    {
      "TripId": 1,
      "eventfulId": "SingleDadMixer",
      "startLocation": "1600 Pennsylvania Ave NW, Washington, DC 20500",
      "unconfirmedRiders": [
        {
          "id": 4,
          "name": "Alice Kingsley",
          "email": "alice@kingsley.com",
          "phone": "383-294-1037",
          "profilePicture": null,
          "rating": null,
          "pickupLocation": "4718 Admiralty Way"
        },
        {
          "id": 5,
          "name": "Bart Simpson",
          "email": "bart@simpson.com",
          "phone": "123-456-7890",
          "profilePicture": null,
          "rating": null,
          "pickupLocation": "4114 Sepulveda Blvd"
        }
      ],
      "confirmedRiders": [
        {
          "id": 8,
          "name": "Captain America",
          "email": "captain@america.com",
          "phone": "986-274-1893",
          "profilePicture": null,
          "rating": null,
          "pickupLocation": "604 Arizona Ave #238, Santa Monica, CA 90401"
        },
        {
          "id": 11,
          "name": "Jane Austen",
          "email": "jane@austen.com",
          "phone": "937-239-3093",
          "profilePicture": null,
          "rating": null,
          "pickupLocation": "1401 3rd Street"
        },
        {
          "id": 12,
          "name": "Kevin Bernard",
          "email": "kevin@bernard.com",
          "phone": "290-938-8346",
          "profilePicture": null,
          "rating": null,
          "pickupLocation": "604 Arizona Ave #238, Santa Monica, CA 90401"
        }
      ]
    },
    {
      "TripId": 4,
      "eventfulId": "PlantPhotoGallery",
      "startLocation": "1600 Pennsylvania Ave NW, Washington, DC 20500",
      "unconfirmedRiders": [
        {
          "id": 4,
          "name": "Alice Kingsley",
          "email": "alice@kingsley.com",
          "phone": "383-294-1037",
          "profilePicture": null,
          "rating": null,
          "pickupLocation": "4718 Admiralty Way"
        },
        {
          "id": 5,
          "name": "Bart Simpson",
          "email": "bart@simpson.com",
          "phone": "123-456-7890",
          "profilePicture": null,
          "rating": null,
          "pickupLocation": "4114 Sepulveda Blvd"
        }        
      ],
      "confirmedRiders": [
        {
          "id": 11,
          "name": "Jane Austen",
          "email": "jane@austen.com",
          "phone": "937-239-3093",
          "profilePicture": null,
          "rating": null,
          "pickupLocation": "1401 3rd Street"
        },
        {
          "id": 12,
          "name": "Kevin Bernard",
          "email": "kevin@bernard.com",
          "phone": "290-938-8346",
          "profilePicture": null,
          "rating": null,
          "pickupLocation": "604 Arizona Ave #238, Santa Monica, CA 90401"
        }
      ]
    }
  ]
}
```

---
3. How to Toggle a Users confirmation status on the Driver Profile
---
*You need to make a PUT request to this URL*<br>
**`req.url = localhost:<PORT>/api/driverProfile`** <br>
*PUT requests from Rider Event page must send in data following this format* <br>
```javascript
{
  "TripId": "<ID>" //id from trip that driver clicked on
  "UserId" : "<ID>" //the id of the RIDER that the driver wants to toggle
}
```

*In response, you will get an object that looks like this:*
```javascript
{
  "updated": "Rider"
}
```
*or*
```javascript
{
  "updated": "Unconfirmed"
}
```
