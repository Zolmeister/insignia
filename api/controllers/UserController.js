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

module.exports = {
    
  login: function(req, res) {
    var username = req.param('username')
    var password = req.param('password')
    
    // set in config/local.js - not commited to source
    var success = username === sails.config.admin.username && password === sails.config.admin.password
    
    // prevent a timing attack
    setTimeout(function() {
      if(success) {
        req.session.isAdmin = true
        return res.json({
          success: true
        })
      }
      
      return res.json({
        success: false
      })
    }, 10)
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
