var db = require("../db/db.js");
var signHelper = require("../helperFunctions/signHelpers");
var serverHelpers = require("../server-helpers");
var bcrypt = require('bcrypt');

module.exports = models = {
  signin:{
    get: function(){},
    post: function(callback, params){
      console.log('inside models signin post');
      var email = params.email;
      var password = params.password;
      console.log(email + ' ' + password);
      signHelper.setSignin(callback, params);
    }
  },
  signup:{
    get: function(){},
    post: function(callback, params){
      console.log('inside models signup post');
      signHelper.setSignup(callback, params);
    }
  },
}
