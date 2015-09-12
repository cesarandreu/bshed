/**
 * Webpack config maker
 */
const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const StatsPlugin = require('stats-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PROJECT_ROOT = path.resolve(__dirname, '..')

module.exports = function buildWebpackConfig (options) {
  options = options || {}

  // Environment
  const NODE_ENV = process.env.NODE_ENV || 'development'

  // Build type
  const SERVER = !!options.SERVER
  const BUILD = !!options.BUILD
  const TEST = !!options.TEST

  // Configuration object
  const config = {}

  config.context = PROJECT_ROOT

  config.entry = TEST
    ? {}
    : {
      bshed: SERVER
        ? './server/config/bootstrap.js'
        : './client/config/bootstrap.js'
    }

  config.output = TEST
    ? {}
    : {
      filename: SERVER
        ? 'server.js'
        : (BUILD ? '[name].[hash].js' : '[name].bundle.js'),

      publicPath: BUILD
        ? '/assets/'
        : 'http://localhost:8080/assets/',

      pathinfo: !BUILD || SERVER,

      path: PROJECT_ROOT + (SERVER ? '/build' : '/build/assets'),

      libraryTarget: SERVER
        ? 'commonjs2'
        : 'var'
    }

  config.target = SERVER ? 'node' : 'web'

  config.devtool = BUILD || SERVER
    ? 'source-map'
    : 'inline-source-map'

  config.externals = []
  if (SERVER) {
    config.externals.push(
      /^[a-z\-0-9]$/,
      { './stats.json': true }
    )
  }

  const babelRelayPluginPath = PROJECT_ROOT + '/config/babel-relay-plugin.js'

  config.module = {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: TEST || BUILD || SERVER
        ? [
          'babel?{ cacheDirectory: true, plugins: ["' + babelRelayPluginPath + '"] }'
        ]
        : [
          'react-hot',
          'babel?{ cacheDirectory: true, plugins: ["' + babelRelayPluginPath + '"] }'
        ]
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|ttf|eot)$/,
      loader: 'file'
    }]
  }

  config.postcss = [
    autoprefixer({ browsers: ['last 2 version'] })
  ]

  config.resolve = {
    extensions: ['', '.js', '.jsx']
  }

  config.devServer = {
    contentBase: PROJECT_ROOT + '/build',
    stats: {
      modules: false,
      cached: false,
      chunk: false
    }
  }

  config.node = SERVER
    ? { __filename: true, __dirname: true }
    : {}

  config.plugins = []
  if (SERVER) {
    config.plugins.push(
      // Enable source maps
      new webpack.BannerPlugin('require("source-map-support").install();', {
        entryOnly: true,
        raw: true
      })
    )
  } else {
    config.plugins.push(
      // Set NODE_ENV
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      }),

      // Generate index.html
      new HtmlWebpackPlugin({
        template: './config/index.html',
        title: 'bshed',
        minify: BUILD,
        inject: true
      })
    )

    if (TEST) {
      config.plugins.push(
        // Ignore jsdom
        new webpack.IgnorePlugin(/jsdom$/)
      )
    } else {
      config.plugins.push(
        // Emit stats.json
        new StatsPlugin('./stats.json')
      )
    }

    if (BUILD) {
      config.plugins.push(
        // Minifify and dedupe
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
      )
    }
  }

  return config
}
