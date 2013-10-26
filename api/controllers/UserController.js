/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var crypto = require('crypto')
var adminUsername = null
var adminPassword = null

// TODO: fix this hack
setTimeout(function() {
  adminUsername = crypto.createHash('sha1').update(sails.config.admin.username).digest('hex')
  adminPassword = crypto.createHash('sha1').update(sails.config.admin.password).digest('hex')
}, 2000)


module.exports = {
    
  login: function(req, res) {
    var username = req.param('username')
    var password = req.param('password')
    
    // constant time string comparison to prevent timing attack
    username = crypto.createHash('sha1').update(username).digest('hex')
    password = crypto.createHash('sha1').update(password).digest('hex')
      
    
    // set in config/local.js - not commited to source
    var success = username === adminUsername && password === adminPassword
    
    if(success) {
      req.session.isAdmin = true
      return res.json({
        success: true
      })
    }
    
    return res.json({
      success: false
    })
  },
  
  logout: function(req, res) {
    req.session.isAdmin = false
    res.json({
      success: true
    })
  },
  
  isAdmin: function(req, res) {
    res.json({
      isAdmin: !!req.session.isAdmin
    })
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
