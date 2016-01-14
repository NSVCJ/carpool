var controllers = require('./controllers');
var router = require('express').Router();

for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get)
    .put(controllers[route].put)
    .post(controllers[route].post);
}

module.exports = router;
