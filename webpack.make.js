var fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function buildWebpackConfig (options) {
  options = options || {}

  var ENV = options.ENV || process.env.NODE_ENV || 'development',
    DEVELOPMENT = options.DEVELOPMENT || ENV === 'development',
    PRODUCTION = options.PRODUCTION || ENV === 'production',
    SERVER = options.SERVER, DEBUG = options.DEBUG

  // shared values
  var publicPath = PRODUCTION ? '/assets/' : 'http://localhost:8080/assets/',
    outputPath = path.join(__dirname, 'public', SERVER ? 'renderer' : 'assets')

  var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/
  ]

  // base
  var config = {
    debug: DEBUG,
    externals: [],
    module: {
      noParse: [/react-with-addons/],
      loaders: [{
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url?limit=10000'
      }, {
        test: /\.(woff)$/,
        loader: 'url?limit=100000'
      }, {
        test: /\.(ttf|eot)$/,
        loader: 'file'
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    plugins: [
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(ENV)})
    ],
    devServer: {
      stats: {
        exclude: excludeFromStats,
        cached: false
      }
    }
  }

  // target
  config.target = SERVER ? 'node' : 'web'

  // Source maps
  config.devtool = PRODUCTION ? 'source-map' : 'eval-source-map'

  // entry
  config.entry = {
    scripts: SERVER ? './client/server' : './client'
  }

  // externals
  if (SERVER) {
    // Every non-relative module is external
    config.externals.push(/^[a-z\-0-9]+$/)
  }

  // output
  var filename = SERVER ? 'index.js' : '[name].js',
    chunkFilename = DEVELOPMENT && SERVER ? '[id].js' : '[name].js'

  if (PRODUCTION && !SERVER) {
    filename += '?[chunkhash]'
    chunkFilename += '?[chunkhash]'
  }

  config.output = {
    path: outputPath,
    pathinfo: DEBUG,
    publicPath: publicPath,
    filename: filename,
    chunkFilename: chunkFilename,
    sourceMapFilename: 'debugging/[file].map',
    libraryTarget: SERVER ? 'commonjs2' : void 0
  }

  // loaders
  var babelLoader = 'babel?experimental&optional=runtime'

  // Webpack fails at parsing generator functions :(
  // babelLoader += SERVER ? '&blacklist=regenerator' : ''
  config.module.loaders.push({
    test: /\.js$/,
    loader: babelLoader,
    exclude: /.*node_modules.*/
  })

  var hotLoader = PRODUCTION || SERVER ? '' : 'react-hot!'
  config.module.loaders.push({
    test: /\.jsx$/,
    loader: hotLoader + babelLoader,
    exclude: /.*node_modules.*((?!\.jsx).{4}$)/
  })

  var lessLoader = 'css?sourceMap!autoprefixer!less?sourceMap'
  config.module.loaders.push({
    test: /\.less$/,
    loader: PRODUCTION ? ExtractTextPlugin.extract(lessLoader) : 'style!' + lessLoader
  })

  // plugins
  if (!SERVER) {
    config.plugins.push(new webpack.PrefetchPlugin('react'))
    config.plugins.push(StatsPlugin())
  }

  if (PRODUCTION || SERVER) {
    // Ensures requires for 'react' and 'react/addons' normalize to the same path
    var reactAddonsPath = require.resolve('react/dist/react-with-addons'),
      reactRegex = /^react(\/addons)?$/
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(reactRegex, reactAddonsPath))
  }

  if (PRODUCTION && !SERVER) {
    // Minifify, dedupe, extract css
    config.plugins.push(
      new ExtractTextPlugin('[name].css?[contenthash]'),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin()
    )
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
