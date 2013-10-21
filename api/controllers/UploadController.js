/**
 * UploadController
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

var gridjs = require('gridjs')
var gs = gridjs('mongodb://localhost/insignia')
var fs = require('fs')
var domain = require('domain')
var imgPlaceholder = {
  'feature': 'assets/img/placeholder-960-400.png',
  'main': 'assets/img/placeholder-680-420.png',
  'tile': 'assets/img/placeholder-470-290.png'
}

module.exports = {
    
  upload: function(req, res) {
    console.log('uploading file')
    var project = req.param('title')
    var file = req.files.file
    var size = req.param('size')
    
    var uploadStream= fs.createReadStream(file.path).pipe(gs.createWriteStream(project+'/'+size))
    uploadStream.on('close', function(){
      fs.unlink(file.path, function(err) {
        if(err) return res.json({error: 'error uploading file'})
        console.log('file upload success')
        return res.json({success: 'true'})
      })
    })
    
    uploadStream.on('error', function(err){
      console.error(err)
      return res.json({error: 'error uploading file'})
    })
  },

  getImg: function(req, res) {
    console.log('streaming file')
    var project = req.param('title')
    var size = req.param('size')
    
    var imgDomain = domain.create()
    
    imgDomain.run(function() {
      var imgStream = gs.createReadStream(project+'/'+size).pipe(res)
      imgStream.on('error', function(err){
        fs.createReadStream(imgPlaceholder[size] || imgPlaceholder['main']).pipe(res)
      })
    })
    
    imgDomain.on('error', function(err){
      fs.createReadStream(imgPlaceholder[size] || imgPlaceholder['main']).pipe(res)
    })
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UploadController)
   */
  _config: {}

  
};
