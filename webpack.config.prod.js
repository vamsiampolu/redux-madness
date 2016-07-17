var constants = require('./webpack.config.constants')
var webpack = require('webpack')

var CleanPlugin = require('webpack-clean-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var PurifyCssPlugin = require('purifycss-webpack-plugin')
var VisualizerPlugin = require('webpack-visualizer-plugin')

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

var config = {
  entry: constants.PROD_ENTRY,
  output: constants.PROD_OUTPUT,
  module: {
    loaders: [
      {
        test: constants.REGEX.CSS,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      },
      {
        test: constants.REGEX.IMAGE,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack'
        ]
      },
      {
        test: constants.REGEX.SVG,
        loader: ['svg-sprite?name=[name].[hash]', 'image-webpack']
      }
    ]
  },
  imageWebpackLoader: {
    imagemin: {
      optimizationLevel: 7,
      interlaced: false
    },
    pngquant: {
      quality: '65-90',
      speed: 4
    },
    svgo: {
      plugins: [
        {
          removeViewBox: false
        },
        {
          removeEmptyAttrs: false
        }
      ]
    }
  },
  devtool: 'source-map',
  plugins: [
    new CommonsChunkPlugin(constants.plugins.CHUNKS),
    new ExtractTextPlugin('[name][chunkhash].css'),
    new PurifyCssPlugin(constants.plugins.PURIFY),
    new UglifyJsPlugin(constants.plugins.UGLIFY),
    new VisualizerPlugin(),
    new CleanPlugin([constants.PROD_OUTPUT.path], constants.plugins.CLEAN)
  ]
}

module.exports = config
