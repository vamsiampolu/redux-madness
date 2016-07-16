var webpack = require('webpack')
var constants = require('./webpack.config.constants')
var HmrPlugin = webpack.HotModuleReplacementPlugin
var NpmPlugin = require('npm-install-webpack-plugin')
/*
  When I reconfigure:

  1. DEV_SOURCEMAP goes to dotenv
  1.1 DEV_HOST and DEV_PORT go to dotenv
  2. DEV_OUTPUT remains in constants but uses dotenv(??)
 */

var config = {
  entry: constants.DEV_ENTRY,
  output: constants.DEV_OUTPUT,
  devtool: process.env.DEV_SOURCEMAP,
  devServer: {
    inline: true,
    hot: true,
    historyApiFallback: true,
    compress: true,
    stats: 'errors-only',
    contentBase: constants.DEV_OUTPUT.path,
    host: constants.DEV_HOST,
    port: constants.DEV_PORT
  },
  module: {
    loaders: [
      {
        test: constants.REGEX.CSS,
        loaders: ['style', 'css']
      },
      {
        test: constants.REGEX.FONT,
        loader: 'url',
        query: {
          limit: 50000
        }
      },
      {
        test: constants.REGEX.IMAGE,
        loader: 'file'
      },
      {
        test: constants.REGEX.SVG,
        loader: 'svg-sprite'
      }
    ]
  },
  plugins: [
    new NpmPlugin(constants.plugins.NPM),
    new HmrPlugin(constants.plugins.HMR)
  ]
}

module.exports = config
