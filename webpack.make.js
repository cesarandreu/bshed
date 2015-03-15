var fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function buildWebpackConfig (options) {
  options = options || {}

  var ENV = options.ENV || process.env.NODE_ENV || 'development',
    SERVER = options.SERVER || process.env.SERVER,
    BUILD = options.BUILD || process.env.BUILD

  // shared values
  var publicPath = BUILD ? '/assets/' : 'http://localhost:8080/assets/'
  var outputPath = path.resolve('public', SERVER ? 'renderer' : 'assets')

  var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/
  ]

  // base
  var config = {
    externals: [],
    module: {
      loaders: [{
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: BUILD ? 'url?limit=10000' : 'url'
      }, {
        test: /\.(woff)$/,
        loader: BUILD ? 'url?limit=100000' : 'url'
      }, {
        test: /\.(ttf|eot)$/,
        loader: 'file'
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.less']
    },
    plugins: [
      // TODO: only use when non-server?
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ENV)
      })
    ],
    devServer: {
      contentBase: './public',
      stats: {
        exclude: excludeFromStats,
        cached: false
      }
    }
  }

  // target
  config.target = SERVER ? 'node' : 'web'

  // Source maps
  config.devtool = BUILD ? 'source-map' : 'eval'

  // entry
  config.entry = {
    bshed: SERVER ? './client/renderer' : './client'
  }

  // externals
  if (SERVER) {
    // Every non-relative module is external
    config.externals.push(/^[a-z\-0-9]+$/)
  }

  // output
  var filename = SERVER ? 'index.js' : '[name].[hash].js'

  config.output = {
    path: outputPath,
    pathinfo: !BUILD,
    publicPath: publicPath,
    filename: filename,
    chunkFilename: '[id].[hash].js',
    libraryTarget: SERVER ? 'commonjs2' : void 0
  }

  // loaders
  var babelLoader = 'babel?experimental'
  babelLoader += SERVER ? '' : '&optional=runtime'

  // Webpack fails at parsing generator functions :(
  // babelLoader += SERVER ? '&blacklist=regenerator' : ''
  config.module.loaders.push({
    test: /\.js$/,
    loader: babelLoader,
    exclude: /.*node_modules.*/
  })

  var hotLoader = BUILD || SERVER ? '' : 'react-hot!'
  config.module.loaders.push({
    test: /\.jsx$/,
    loader: hotLoader + babelLoader,
    exclude: /.*node_modules.*((?!\.jsx).{4}$)/
  })

  var lessLoader = 'css?sourceMap!autoprefixer!less?sourceMap'
  lessLoader = BUILD ? ExtractTextPlugin.extract(lessLoader) : 'style!' + lessLoader
  config.module.loaders.push({
    test: /\.less$/,
    loader: SERVER ? 'null' : lessLoader
  })

  // plugins
  if (BUILD && !SERVER) {
    // Minifify, dedupe, extract css
    config.plugins.push(
      new ExtractTextPlugin('[name].[hash].css'),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  if (!SERVER) {
    config.plugins.push(StatsPlugin())
  }

  return config

  function StatsPlugin () {
    return function () {
      this.plugin('done', saveStats)
    }

    function saveStats (stats) {
      var jsonStats = stats.toJson({
        exclude: excludeFromStats,
        chunkModules: true
      })
      jsonStats.publicPath = publicPath
      mkdirp.sync(outputPath)
      fs.writeFileSync(path.join(outputPath, 'stats.json'), JSON.stringify(jsonStats))
    }
  }
}
