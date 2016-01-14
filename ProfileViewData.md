---
Profile View Get Requests
---

There are four things the Profile View needs from the database

1. Info about trips where I'm a confirmed Rider
2. Info about trips where I'm an unconfirmed Rider
3. Info about confirmed riders on trips where I'm a Driver
4. Info about unconfirmed riders on trips where I'm a Driver

Because there are four things you need to get, you need a route for each get request

1. api/riderConfirmed
2. api/riderUnconfirmed
3. api/driverConfirmed
4. api/driverUnconfirmed

This guide will walk you through how to make each of those get requests.

---
1. Info about trips where I'm a confirmed Rider
---

*Use this address as your request url* <br>
**`req.url = localhost:<PORT>/api/riderConfirmed`** <br>
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
