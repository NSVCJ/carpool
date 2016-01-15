---
Profile View Get Requests
---

There are 2 things the Profile View needs from the database

1. Info about trips where I'm a Rider
2. Info about trips where I'm a Driver

You need to specify a route for each get request

1. api/riderProfile
2. api/driverProfile

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
*In response, you will get an object that looks like this:*
```javascript
{

}
```
