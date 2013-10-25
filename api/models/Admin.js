/**
 * Admin
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
//var bcrypt = require('bcrypt')

module.exports = {

  attributes: {
  	
    username: 'string',
    password: 'string'
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }
  
  /*beforeCreate: function(values, next) {
    if(values.password) {
      bcrypt.hash(values.password, 10, function(err, hash) {
        if(err) return next(err)
        values.password = hash
        next()
      })
    } else {
      next()
    }
  }*/

};
