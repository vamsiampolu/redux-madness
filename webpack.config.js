/*
  Notes:

    + I need to figure out what bits I need to retrieve from  dotenv
      and what bits of config can be pushed to a constants file...

    + It goes without saying that I will have a seperate config for
    development, production and testing(if I can)
 */

var webpack = require('webpack')
var merge = require('webpack-merge')
var validator = require('webpack-validator')
var constants = require('./webpack.config.constants')
var commonConfig = require('./webpack.config.common')

require('dotenv').config()
var env = process.env.NODE_ENV
var config = {}
switch (env) {
  case constants.DEV:
    var devConfig = require('./webpack.config.dev')
    config = merge(commonConfig, devConfig)
    break
}

module.exports = validator(config)
