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

    entry: {
      bshed: SERVER ? './client/renderer/server.js' : './client/index.js'
    },

    output: {
      filename: filename,
      publicPath: publicPath,
      pathinfo: !BUILD || SERVER,
      path: __dirname + (SERVER ? '/build' : '/public/assets')
    },

    target: SERVER ? 'node' : 'web',

    devtool: BUILD || SERVER ? 'source-map' : 'eval',

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
        loader: (BUILD || SERVER ? '' : 'react-hot!') + 'babel?optional=runtime&cacheDirectory',
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
      extensions: ['', '.js', '.jsx', '.less']
    },
    plugins: [
      StatsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ENV)
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

  // loaders
  var babelLoader = 'babel?optional=runtime&breakConfig=true&stage=1'
  config.module.loaders.push({
    test: /\.js$/,
    loader: babelLoader,
    exclude: /node_modules/
  })

  config.module.loaders.push({
    test: /\.jsx$/,
    loader: (BUILD ? '' : 'react-hot!') + babelLoader,
    exclude: /node_modules/
  })

  var lessLoader = 'css?sourceMap!autoprefixer!less?sourceMap'
  config.module.loaders.push({
    test: /\.less$/,
    loader: BUILD ? ExtractTextPlugin.extract(lessLoader) : 'style!' + lessLoader
  })

  if (BUILD) {
    // Minifify, dedupe, extract css
    config.plugins.push(
      new ExtractTextPlugin('[name].[hash].css'),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  return config

  function StatsPlugin () {
    return function () {
      this.plugin('done', saveStats)
    }

    function saveStats (stats) {
      var jsonStats = stats.toJson({
        chunks: false,
        modules: false
      })
      jsonStats.publicPath = publicPath
      mkdirp.sync(outputPath)
      fs.writeFileSync(outputPath + '/stats.json', JSON.stringify(jsonStats))
    }
  }
}
