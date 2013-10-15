/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var _ = require('lodash')

// encode a string to URI, escaping all characters
var encodeAllURI = _.partialRight(_.reduce, function(val, l){
    return val+'%'+l.charCodeAt(0).toString(16)
  }, '')

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    
  },
  
  beforeCreate: function(values, next) {
    
    // encoded email to protect against spam bots
    if(values.email) {
      values.encodedEmail = encodeAllURI(values.email)
      delete values.email
    }
    next()
  },
  
  beforeUpdate: function(values, next) {
    
    // encoded email to protect against spam bots
    if(values.email) {
      values.encodedEmail = encodeAllURI(values.email)
      delete values.email
    }
    next()
  }

};
