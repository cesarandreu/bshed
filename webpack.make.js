var fs = require('fs')
var mkdirp = require('mkdirp')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function buildWebpackConfig (options) {
  options = options || {}

  var ENV = options.ENV || process.env.NODE_ENV || 'development',
    BUILD = options.BUILD || process.env.BUILD

  // shared values
  var publicPath = BUILD ? '/assets/' : 'http://localhost:8080/assets/'
  var outputPath = __dirname + '/public/assets'

  // base
  var config = {
    entry: {
      bshed: './client'
    },

    output: {
      path: outputPath,
      pathinfo: !BUILD,
      publicPath: publicPath,
      filename: '[name].[hash].js',
      chunkFilename: '[id].[hash].js'
    },

    target: 'web',

    devtool: BUILD ? 'source-map' : 'eval',

    externals: [],
    module: {
      loaders: [{
        test: /\.(png|jpg|jpeg|gif|svg|woff|ttf|eot)$/,
        loader: 'file'
      }]
    },
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
    exclude: /.*node_modules.*/
  })

  config.module.loaders.push({
    test: /\.jsx$/,
    loader: (BUILD ? '' : 'react-hot!') + babelLoader,
    exclude: /.*node_modules.*((?!\.jsx).{4}$)/
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
