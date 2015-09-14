const fs = require('fs')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const StatsPlugin = require('stats-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function buildWebpackConfig (options) {
  options = options || {}

  // Environment
  const NODE_ENV = options.NODE_ENV || process.env.NODE_ENV || 'development'

  // Build type
  const SERVER = !!options.SERVER
  const BUILD = !!options.BUILD
  const TEST = !!options.TEST

  // shared values
  const publicPath = BUILD || (BUILD && SERVER)
    ? '/assets/'
    : 'http://localhost:8080/assets/'

  // Output filename
  // server.js, [name].[hash].js, [name].bundle.js
  const filename = SERVER
    ? 'server.js'
    : (BUILD
        ? '[name].[hash].js'
        : '[name].bundle.js'
      )

  // base
  const config = {

    context: __dirname,

    entry: TEST ? {} : {
      bshed: SERVER ? './client/bootstrap/server.js' : './client/bootstrap/client.js'
    },

    output: TEST ? {} : {
      filename: filename,
      publicPath: publicPath,
      pathinfo: !BUILD || SERVER,
      path: __dirname + (SERVER ? '/build' : '/public/assets'),
      libraryTarget: SERVER ? 'commonjs2' : 'var'
    },

    target: SERVER ? 'node' : 'web',

    devtool: BUILD || SERVER ? 'source-map' : (TEST ? 'inline-source-map' : 'eval'),

    externals: [{
      './stats.json': 'commonjs ./stats.json'
    }],

    module: {
      loaders: [{
        test: /\.(jsx|js)$/,

        loader: (function () {
          // Enable babel-plugin-typecheck in development
          // Enable babel-plugin-rewire in test
          if (TEST) {
            return [
              'babel?optional[]=runtime&plugins[]=rewire&cacheDirectory'
            ].join('!')
          } else if (BUILD || SERVER) {
            return [
              'babel?optional[]=runtime&cacheDirectory'
            ].join('!')
          } else {
            return [
              'react-hot',
              'babel?optional[]=runtime&plugins[]=typecheck&cacheDirectory'
            ].join('!')
          }
        })(),

        // loader: BUILD || SERVER || TEST ? 'babel?optional=runtime&cacheDirectory' : 'react-hot!babel!flowcheck!babel?{ "optional": "runtime", "blacklist": ["flow"], "cacheDirectory": true }',
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        loader: SERVER || TEST ? 'null' : ExtractTextPlugin.extract(
          'style',
          'css?sourceMap!postcss!less?sourceMap'
        )
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|ttf|eot)$/,
        loader: 'file'
      }]
    },

    postcss: [
      autoprefixer({ browsers: ['last 2 version'] })
    ],

    resolve: {
      extensions: ['', '.js', '.jsx', '.less']
    },

    plugins: [
      new ExtractTextPlugin('[name].[hash].css', {
        disable: !BUILD || SERVER || TEST
      })
    ],

    devServer: {
      contentBase: './public',
      stats: {
        modules: false,
        cached: false,
        chunk: false
      }
    },

    node: !SERVER ? {} : {
      __filename: true,
      __dirname: true
    }
  }

  // Externals
  // http://jlongster.com/Backend-Apps-with-Webpack--Part-I
  if (SERVER) {
    config.externals.push(
      fs.readdirSync('node_modules')
        .filter(function (x) {
          return ['.bin'].indexOf(x) === -1
        })
        .reduce(function (nodeModules, mod) {
          nodeModules[mod] = 'commonjs ' + mod
          return nodeModules
        }, {
          './stats.json': 'commonjs ./stats.json'
        })
    )
  }

  /**
   * PLUGINS
   */

  // http://jlongster.com/Backend-Apps-with-Webpack--Part-I
  if (SERVER) {
    config.plugins.push(
      new webpack.BannerPlugin('require("source-map-support").install();', {
        entryOnly: true,
        raw: true
      })
    )
  }

  if (!SERVER) {
    if (!TEST) {
      config.plugins.push(
        new StatsPlugin(__dirname + '/build/stats.json')
      )
    }

    if (TEST) {
      config.plugins.push(
        new webpack.IgnorePlugin(/jsdom$/)
      )
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      })
    )
  }

  // Minifify and dedupe
  if (BUILD && !SERVER) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  return config
}