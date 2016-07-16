var constants = require('./webpack.config.constants')
var HtmlPlugin = require('html-webpack-plugin')
var DotEnvPlugin = require('webpack-dotenv-plugin')

var config = {
  module: {
    preLoaders: [
      {
        test: constants.REGEX.JSX,
        loader: 'standard',
        include: constants.SRC_PATH
      }
    ],
    loaders: [
      {
        test: constants.REGEX.JSX,
        loader: 'babel',
        include: constants.SRC_PATH,
        query: {
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new HtmlPlugin(constants.plugins.HTML),
    new DotEnvPlugin(constants.plugins.ENV)
  ]
}

module.exports = config
