const fs = require('fs')
const mkdirp = require('mkdirp')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer-core')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function buildWebpackConfig (options) {
  options = options || {}

  const NODE_ENV = options.NODE_ENV || process.env.NODE_ENV || 'development'
  const SERVER = !!(options.SERVER || process.env.SERVER)
  const BUILD = !!(options.BUILD || process.env.BUILD)
  const TEST = !!(options.TEST || process.env.TEST)

  // shared values
  const publicPath = BUILD ? '/assets/' : 'http://localhost:9090/assets/'

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
      bshed: SERVER ? './client/renderer/server.js' : './client/index.js'
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
        test: /\.js$/,
        loader: 'babel?optional=runtime&cacheDirectory',
        exclude: /node_modules/
      }, {
        test: /\.jsx$/,
        loader: (BUILD || SERVER || TEST ? '' : 'react-hot!') + 'babel?optional=runtime&cacheDirectory',
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        loader: SERVER ? 'null' : ExtractTextPlugin.extract(
          'style',
          'css?sourceMap!postcss!less?sourceMap'
        )
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|ttf|eot)$/,
        loader: 'file'
      }]
    },

    postcss: [
      autoprefixer({
        browsers: ['last 2 version']
      })
    ],

    resolve: {
      extensions: ['', '.js', '.jsx', '.less'],
      fallback: [
        __dirname + '/models'
      ]
    },

    plugins: [
      new ExtractTextPlugin('[name].[hash].css', {
        disable: !BUILD || SERVER || TEST
      })
    ],

    devServer: {
      port: 9090,
      contentBase: './public',
      stats: {
        modules: false,
        cached: false,
        chunk: false
      }
    }
  }

  // Externals
  // http://jlongster.com/Backend-Apps-with-Webpack--Part-I
  if (SERVER) {
    config.externals.push(
      fs.readdirSync('node_modules')
        .filter(function (x) {
          return ['.bin', 'react'].indexOf(x) === -1
        })
        .reduce(function (nodeModules, mod) {
          nodeModules[mod] = 'commonjs ' + mod
          return nodeModules
        }, {
          'react/addons': 'commonjs react/addons',
          'react': 'commonjs react/addons'
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
        ClientStatsPlugin({
          publicPath: publicPath
        })
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

/**
 * Client stats.json plugin
 */
function ClientStatsPlugin (params) {
  return function () {
    this.plugin('done', saveStats)
  }

  function saveStats (stats) {
    const jsonStats = stats.toJson({
      chunks: false,
      modules: false
    })
    jsonStats.publicPath = params.publicPath
    mkdirp.sync(__dirname + '/build')
    fs.writeFileSync(__dirname + '/build/stats.json', JSON.stringify(jsonStats))
  }
}
