'use strict'
//server
const express = require('express')
const morgan = require('morgan') 
const http = require('http')
const url = require('url')
const FocaWebApi= require("./foca-web-api")
const port = 3000
const authWebApi = require('./auth-web-api')
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const nconf = require('nconf')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
 
nconf
    .argv()
    .env()
    .defaults({'NODE_ENV': 'development'})
const NODE_ENV = nconf.get('NODE_ENV')
const isDev = NODE_ENV == 'development'
console.log('Running ' + NODE_ENV)
 
const focaWS = express()
focaWS.use(bodyParser.urlencoded({ extended: false }))
focaWS.use(bodyParser.json())
focaWS.use(morgan('dev'))
focaWS.use(expressSession({secret: 'keyboard cat', resave: false, saveUninitialized: true }))
focaWS.use(frontEndMiddleware(isDev))


authWebApi(focaWS)
FocaWebApi(focaWS)

http
    .createServer(focaWS)
    .listen(port, () => console.log('Server running on port '+ port))

function frontEndMiddleware(isDev) {
    return isDev
        ? webpackMiddleware(webpack(webpackConfig))
        : express.static('dist')
}
