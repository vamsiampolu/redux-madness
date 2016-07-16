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
  output: constants.PROD_OUTPUT
}
