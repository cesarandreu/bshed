var fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function buildWebpackConfig (options) {
  options = options || {}

  var ENV = options.ENV || process.env.NODE_ENV || 'development',
    PRODUCTION = options.PRODUCTION || ENV === 'production'

  // shared values
  var publicPath = PRODUCTION ? '/assets/' : 'http://localhost:8080/assets/',
    outputPath = path.join(__dirname, 'public', 'assets')

  // base
  var config = {
    target: 'web',
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
      StatsPlugin(publicPath, outputPath),
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(ENV)}),
      new webpack.PrefetchPlugin('react')
    ]
  }

  // Source maps
  config.devtool = PRODUCTION ? 'source-map' : 'eval-source-map'

  // entry
  config.entry = {
    scripts: './client/index.js'
  }

  // output
  config.output = {
    path: outputPath,
    pathinfo: !PRODUCTION,
    publicPath: publicPath,
    filename: PRODUCTION ? 'scripts.[hash].js' : 'scripts.dev.js'
  }

  // loaders
  var babelLoader = 'babel?experimental&optional=runtime'
  config.module.loaders.push({
    test: /\.js$/,
    loader: babelLoader,
    exclude: /.*node_modules.*/
  })

  var hotLoader = PRODUCTION ? '' : 'react-hot!'
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
  if (PRODUCTION) {
    // var cssName = PRODUCTION ? 'scripts.[hash].css' : 'scripts.dev.css'
    config.plugins.push(new ExtractTextPlugin('scripts.[hash].css'))

    // Ensures requires for 'react' and 'react/addons' normalize to the same path
    var reactAddonsPath = require.resolve('react/dist/react-with-addons'),
      reactRegex = /^react(\/addons)?$/
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(reactRegex, reactAddonsPath))

    // Minifify, dedupe
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin()
    )
  }

  return config
}

function StatsPlugin (publicPath, outputPath) {
  return function () {
    this.plugin('done', saveStats)
  }

  function saveStats (stats) {
    var jsonStats = stats.toJson()
    jsonStats.publicPath = publicPath
    mkdirp.sync(outputPath)
    fs.writeFileSync(path.join(outputPath, 'stats.json'), JSON.stringify(jsonStats))
  }
}
