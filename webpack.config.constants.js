/*
  maybe the constants can have nested properties based on `path`

  REGEX under constants is definitely a good idea

  If you were using webpack-dev-middleware and webpack-hot-middleware
  your frontend would be at the same port as the backend...

  the plugins and regexp config here is pretty awesome, we should move this
  into multiple objects

  The dotenv shenanigans here are the dumbest thing I have ever done
  But it could work if our config is a seperate folder

  The idea is that you should design your config seperately, thus the config settings should live in a seperate dotenv file

  Can explore that later...
 */

var path = require('path')
var template = require('html-webpack-template')
require('dotenv').config()

var _package = require('./package.json')
var dependencies = Object.keys(_package.dependencies)
var SRC_PATH = path.resolve(process.env.DEV_ENTRY)
var DEV_ENTRY = path.join(SRC_PATH, 'index.js')
var DEV_OUTPUT_PATH = path.resolve(process.env.DEV_OUTPUT_PATH)

var constants = {
  DEV: 'DEVELOPMENT',
  PROD: 'PRODUCTION',
  TEST: 'TESTING',
  SRC_PATH: SRC_PATH,
  DEV_ENTRY: DEV_ENTRY,
  DEV_OUTPUT: {
    filename: process.env.DEV_OUTPUT_FILENAME,
    path: DEV_OUTPUT_PATH
  },
  DEV_SOURCEMAPS: process.env.DEV_SOURCEMAPS,
  DEV_PORT: process.env.DEV_PORT,
  DEV_HOST: process.env.DEV_HOST,
  REGEX: {
    JSX: /\.jsx?$/,
    DEVDEP: /(^babel-?.*|.*-plugin$|.*-loader)/,
    CSS: /\.css$/,
    FONT: /\.(eot|ttf|woff|woff2)$/,
    IMAGE: /\.(jpe?g|png|gif)$/i,
    SVG: /\.svg$/
  },
  PROD_ENTRY: {
    app: DEV_ENTRY,
    vendor: dependencies,
    style: ['./src/app.css']
  },
  PROD_OUTPUT: {
    path: DEV_OUTPUT_PATH,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  plugins: {
    NPM: {
      dev: function (module) {
        return this.REGEX.DEVDEP.test(module)
      }
    },
    HMR: {
      multiStep: true
    },
    HTML: {
      inject: false,
      mobile: true,
      template: template,
      appMountId: 'root',
      title: process.env.HTML_TITLE,
      baseHref: '/'
    },
    ENV: {
      sample: process.env.DOTENV_SAMPLE_PATH,
      path: process.env.DOTENV_PATH
    }
  }
}

constants.plugins.NPM.dev = constants.plugins.NPM.dev.bind(constants)
module.exports = constants
