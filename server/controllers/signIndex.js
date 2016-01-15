//will need to require some fold called modles
var models = require('../models/signIndex.js');
var jwt  = require('jwt-simple');

module.exports = {
  signin:{
    get: function(req, res){},
    post: function(req, res){
      console.log('inside controller signin post');
      models.signin.post(function(data){
        res.json(data);
      },req.body)
    }
  },
  signup:{
    get: function(req, res){},
    post: function(req, res){
      console.log('inside controller signup post');
      models.signup.post(function(data){
        res.json(data);
      },req.body)
    }
  },
  checkAuth:{
    get: function(req, res){},
    post: function(req, res, next){
      console.log('inside controller checkAuth post');
      var token = req.headers['x-access-token'];
      if(!token){
        next(new Error('No token'));
      }else{
        var username = jwt.decode(token, 'secret');
        models.checkAuth.post(function(found){
          if(found){
            res.status(200).send();
          }else{
            res.status(401).send();
          }
        }, username)
      }
    }
  }
};
