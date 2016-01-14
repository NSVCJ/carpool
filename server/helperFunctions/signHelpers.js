var db = require("../db/db.js");
var bcrypt = require('bcrypt');

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
            return db.User.find({where: {email: params.email}});
          }).then(function(users){
            callback(users);
          })
        })
      }else{
        callback(false);
      }
    })
  },

  setSignin: function(callback, params){
    console.log('inside helperfunction setSignin');
    db.User.find({where: {email: params.email}})
    .then(function(data){
      if(data){
        var userData = data;
        comparePassword(params.password,data.password,function(response){
          if(response){
            callback(userData);
          }else{
            callback(response);
          }
        })
      }else{
        callback(false);
      }
    })
  }
};
