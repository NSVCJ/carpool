//will need to require some fold called modles
var models = require('../models');

module.exports = {
  signin:{
    get: function(req, res){},
    post: function(req, res){
      console.log('inside controller signin post');
      models.signin.post(function(data){
        console.log('res data: ', data);
        res.send(data);
      },req.body)
    }
  },
  signup:{
    get: function(req, res){},
    post: function(req, res){
      console.log('inside controller signup post');
      models.signup.post(function(data){
        console.log('res data: ', data);
        res.send(data);
      },req.body)
    }
  }
};
