var db = require("../db/db.js");
var bcrypt = require('bcrypt');
var jwt  = require('jwt-simple');

var comparePassword = function(userPass, dataPass, callback){
  bcrypt.compare(userPass, dataPass, function(err, loggedin) {
		if(err) console.log(err);
    callback(loggedin);
	})
}

var setPassword = function(password, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
       callback(hash);
    });
  })
}

module.exports = {
  setSignup: function(callback, params){
    console.log('inside helperfunction setSignup');
    console.log('+++line23: ', params.email)
    db.User.find({where: {email: params.email}})
    .then(function(data){
      if(data === null){
        console.log('inside null')
        setPassword(params.password, function(hash){
          db.User.bulkCreate([{
            email: params.email,
            password: hash,
            name: params.name,
            phone: params.phone
          }])
          .then(function(){
            return db.User.find({where: {email: params.email}, attributes: ['id', 'name', 'email','phone']});
          }).then(function(userData){
            console.log('+++line 37: ', userData);
            var token = jwt.encode(params.email, 'secret');
            userData.dataValues.token = token;
            callback(userData);
          })
        })
      }else{
        callback(false);
      }
    })
  },

  setSignin: function(callback, params){
    console.log('inside helperfunction setSignin');
    console.log('+++line51: ', params.email)
    db.User.find({where: {email: params.email}})
    .then(function(data){
      if(data){
        var userData = data;
        comparePassword(params.password,data.password,function(response){
          if(response){
            db.User.find({where: {email: params.email}, attributes: ['id', 'name', 'email','phone']})
            .then(function(data){
              var token = jwt.encode(params.email, 'secret');
              data.dataValues.token = token;
              callback(data);
            })
          }else{
            callback(response);
          }
        })
      }else{
        callback(false);
      }
    })
  },

  findUser: function(callback, username){
    console.log('inside helperfunction findUser');
    db.User.find({where: {email: username}})
    .then(function(data){
      if(data){
        callback(true);
      }else{
        callback(false);
      }
    })
  }
};
