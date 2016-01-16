var models = require('../models');
var utils = require('../server-helpers');
// var models = require('../models/index.js');

module.exports = {

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
    put: function(req, res) {}
  },

  driverProfile:{
    get: function (req, res) {
      console.log('inside controllers driverProfile get');
      models.driverProfile.get(function(driverInfo, riderConfirmedInfo, riderUnconfirmedInfo){
        var driverProfileInfo = utils.driverProfileFormat(driverInfo, riderConfirmedInfo, riderUnconfirmedInfo);
        res.send({"trips": driverProfileInfo});
      }, req.query)
    },
    put: function(req, res) {
      console.log('inside controllers driverConfirmed put');
      models.driverProfile.put(function(record){
        res.send({"updated": record});
      }, req.body);
    },
    post: function (req, res) {}
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
    put: function(req, res) {}
  },

  eventDriver: {
    get: function (req, res) {},
    post: function (req, res) {
      models.eventDriver.post(function(data){
        //console.log('inside controllers trips post')
        res.send({posted: data});
      }, req.body); //some function to get data, fix later
    },
    put: function(req, res) {}
  }
};
