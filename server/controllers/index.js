var models = require('../models');
var utils = require('../server-helpers');
var models = require('../models/index.js');

module.exports = {
  users: {
    get: function (req, res) {
      console.log('inside controllers users get');
      models.users.get(function(data){
        res.send(data);
      })
    },
    post: function (req, res) {
      models.users.post(function(data){
        console.log('inside controllers users post')
        res.send(data);
      })
    },
    put: function(callback, data) {}
  },
  trips:{
    get: function (req, res) {
      console.log('inside controllers trips get');
      models.trips.get(function(data){
        res.send({trips: data});
      }, req.query)
    },
    post: function (req, res) {
      console.log('inside controllers trips post')
      models.trips.post(function(data){
        res.send({posted: data});
      }, req.body); //some function to get data, fix later
    },
    put: function(callback, data) {}
  },
  riderProfile: {
    get: function (req, res) {
      console.log('inside controllers riderProfile get');
      models.riderProfile.get(function(confirmed, unconfirmed) {
        res.send({
          confirmed: confirmed,
          unconfirmed: unconfirmed
        });
      }, req.query);
    },
    post: function (req, res) {},
    put: function(callback, data) {}
  },
  riderConfirmed:{
    get: function (req, res) {
      console.log('inside controllers riderConfirmed get');
      models.riderConfirmed.get(function(riderInfo, driverInfo){
        //console.log("Inside trips get", data);
        //add utility function here to format data, combine entries
        res.send({riderInfo: riderInfo,
                  driverInfo: driverInfo
        });
      }, req.query)
    },
    post: function (req, res) {},
    put: function(callback, data) {}
  },
  riderUnconfirmed:{
    get: function (req, res) {
      console.log('inside controllers riderUnconfirmed get');
      models.riderUnconfirmed.get(function(riderInfo, driverInfo){
        //console.log("Inside trips get", data);
        var riderUnconfirmedArr = utils.riderUnconfirmedFormat(riderInfo, driverInfo);
        res.send(riderUnconfirmedArr);
      }, req.query)
    },
    post: function (req, res) {},
    put: function(callback, data) {}
  },
  driverConfirmed:{
    get: function (req, res) {
      console.log('inside controllers driverConfirmed get');
      models.driverConfirmed.get(function(riderInfo, driverInfo){
        //console.log("Inside trips get", data);
        res.send({riderInfo: riderInfo,
                  driverInfo: driverInfo
        });
      }, req.query)
    },
    post: function (req, res) {},
    put: function(req, res) {
      console.log('inside controllers driverConfirmed put');
      console.log("Here's the body", req.body);
      models.driverConfirmed.put(function(newRole){
        res.send({"newRole": newRole});
      }, req.body);
    }
  },
  driverProfile:{
    get: function (req, res) {
      console.log('inside controllers driverProfile get');
      models.driverProfile.get(function(driverInfo, riderConfirmedInfo, riderUnconfirmedInfo){
        var driverProfileInfo = utils.driverProfileFormat(driverInfo, riderConfirmedInfo, riderUnconfirmedInfo);
        res.send({"driverProfileInfo": driverProfileInfo});
        // res.send({driverProfileInfo: driverInfo,
        //           riderConfirmedInfo: riderConfirmedInfo,
        //           riderUnconfirmedInfo: riderUnconfirmedInfo
        // });
      }, req.query)
    },
    post: function (req, res) {},
    put: function(req, res) {
      console.log('inside controllers driverConfirmed put');
      models.driverConfirmed.put(function(record){
        res.send({"updated": record});
      }, req.body);
    }
  },
  eventRider: {
    get: function (req, res) {
      console.log('inside controllers eventRider get');
      models.eventRider.get(function(data){
        //console.log("Inside trips get", data);
        res.send({trips: data});
      }, req.query)
    },
    post: function (req, res) {
      console.log('inside controllers eventRider post')
      models.eventRider.post(function(data){
        res.send({posted: data});
      }, req.body); //some function to get data, fix later
    },
    put: function(callback, data) {}
  },
  eventDriver: {
    get: function (req, res) {
      console.log('inside controllers eventDriver');
      models.eventDriver.get(function(data){
        res.send({trips: data});
      }, req.query)
    },
    post: function (req, res) {
      models.eventDriver.post(function(data){
        //console.log('inside controllers trips post')
        res.send({posted: data});
      }, req.body); //some function to get data, fix later
    },
    put: function(callback, data) {}
  }
};
