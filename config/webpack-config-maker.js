/**
 * Webpack config maker
 */
const path = require('path')
const webpack = require('webpack')
const cssnext = require('cssnext')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PROJECT_ROOT = path.resolve(__dirname, '..')

module.exports = function buildWebpackConfig (options) {
  options = options || {}

  // Environment
  const NODE_ENV = process.env.NODE_ENV || 'development'

  // Build type
  const BUILD = !!options.BUILD
  const TEST = !!options.TEST

  // Configuration object
  const config = {}

  config.context = PROJECT_ROOT

  config.entry = TEST
    ? {}
    : {
      bshed: './client/config/bootstrap.js'
    }

  config.output = TEST
    ? {}
    : {
      filename: BUILD
        ? '[name].[hash].js'
        : '[name].bundle.js',

      publicPath: BUILD
        ? '/assets/'
        : 'http://localhost:9090/assets/',

      pathinfo: !BUILD,

      path: PROJECT_ROOT + '/build/assets'
    }

  config.devtool = BUILD
    ? 'source-map'
    : 'cheap-module-source-map'

  // babel-loader query
  const babelQuery = {
    extra: {},
    plugins: [PROJECT_ROOT + '/config/babel-relay-plugin.js']
  }
  if (!TEST && !BUILD) {
    babelQuery.plugins.push('react-transform')
    babelQuery.extra['react-transform'] = {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }, {
        transform: 'react-transform-catch-errors',
        imports: ['react', 'redbox-react']
      }]
    }
  }

  config.module = {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: babelQuery
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|ttf|eot)$/,
      loader: 'file'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?sourceMap&modules&localIdentName=[path][name]---[local]---[hash:base64:5]&importLoaders=1!postcss!postcss'
        )
    }]
  }

  config.postcss = [
    cssnext({
      browsers: ['last 2 versions'],
      import: false
    })
  ]

  config.devServer = {
    contentBase: PROJECT_ROOT + '/build',
    port: 9090,
    stats: {
      modules: false,
      cached: false,
      chunk: false
    }
  }

  config.plugins = [
    new ExtractTextPlugin('[name].[hash].css', {
      disable: !BUILD || TEST
    })
  ]

  config.plugins.push(
    // Set NODE_ENV
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  )

  if (!TEST) {
    config.plugins.push(
      // Generate index.html
      new HtmlWebpackPlugin({
        template: './config/index.html',
        title: 'bshed',
        inject: true
      }),

      new webpack.NoErrorsPlugin()
    )
  }

  if (BUILD) {
    config.plugins.push(
      // Minifify and dedupe
      // new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  return config
}
