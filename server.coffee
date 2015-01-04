express = require 'express'
dust = require 'dustjs-linkedin'
fs = require 'fs'
_ = require 'lodash'
Promise = require 'bluebird'
compress = require 'compression'
log = require 'clay-loglevel'

config = require './src/config'

app = express()
router = express.Router()

log.enableAll()

# Dust templates
# Don't compact whitespace, because it breaks the javascript partial
dust.optimizers.format = (ctx, node) -> node

indexTpl = dust.compile fs.readFileSync('index.dust', 'utf-8'), 'index'


distJs = if config.ENV is config.ENVS.PROD \
          then fs.readFileSync('dist/js/bundle.js', 'utf-8')
          else null
distCss = if config.ENV is config.ENVS.PROD \
          then fs.readFileSync('dist/css/bundle.css', 'utf-8')
          else null

dust.loadSource indexTpl

app.use compress()

if config.ENV is config.ENVS.PROD
then app.use express['static'](__dirname + '/dist', {maxage: '14 days'})
else app.use express['static'](__dirname + '/build', {maxage: '14 days'})

# After checking static files
app.use router

# Routes
router.get '*', (req, res) ->
  renderHomePage()
  .then (html) ->
    res.send html
  .catch (err) ->
    log.trace err
    res.status(500).send()

# Cache rendering
renderHomePage = do ->
  page =
    inlineSource: config.ENV is config.ENVS.PROD
    webpackDevHostname: config.WEBPACK_DEV_HOSTNAME
    title: 'Insignia - Zolmeister - Zoli Kahan'
    description: 'Personal portfolio of projects for Zolmeister - Zoli Kahan'
    keywords: 'Insignia, Zolmeister, Zoli, Zoli Kahanm, Zorium'
    name: 'Insignia'
    twitterHandle: '@Zolmeister'
    themeColor: '#00695C'
    favicon: '/images/favicon.ico'
    icon1024: '/images/Z.jpg'
    icon256: '/images/Z.jpg'
    url: 'https://insignia.zolmeister.com'
    distjs: distJs
    distcss: distCss

  rendered = Promise.promisify(dust.render, dust) 'index', page

  -> rendered

module.exports = app
