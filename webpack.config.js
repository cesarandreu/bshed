'use strict';

var fs = require('fs'),
  path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

var ENV = process.env.NODE_ENV || 'development',
  PRODUCTION = ENV === 'production';

var filename = PRODUCTION ? 'scripts.[hash].js' : 'scripts.dev.js';
var publicPath = PRODUCTION ? '/assets/' : 'http://localhost:2992/assets/';
var outputPath = path.join(__dirname, 'public/assets');
var excludeFromStats = [/.*node_modules.*/];

var config = {
  devServer: {
    stats: {
      exclude: excludeFromStats
    }
  },
  devtool: 'sourcemap',
  resolve: {
    extensions: ['', '.js' , '.jsx']
  },
  entry: './client/index.js',
  output: {
    filename: filename,
    publicPath: publicPath,
    pathinfo: !PRODUCTION,
    path: outputPath
  },
  module: {
    loaders: [{
        test: /\.jsx$/,
        loader: (PRODUCTION ? '' : 'react-hot-loader!') + '6to5-loader?runtime=true&experimental',
        exclude: /.*node_modules.*((?!\.jsx).{4}$)/
      }, {
        test: /\.js$/,
        loader: '6to5-loader?runtime=true&experimental',
        exclude: /.*node_modules.*/
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.(woff)/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader'
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!less-loader?sourceMap')
      }
    ]
  },
  plugins: [
    statsPlugin,
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(ENV)}),
    new ExtractTextPlugin(PRODUCTION ? 'styles.[hash].css' : 'styles.dev.css'),
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
    new webpack.PrefetchPlugin('6to5/runtime'),
  ]
};

module.exports = config;

// helpers
function statsPlugin () {
  this.plugin('done', function (stats) {
    var jsonStats = stats.toJson({
      exclude: excludeFromStats
    });
    jsonStats.publicPath = publicPath;
    fs.writeFileSync(path.join(outputPath, 'stats.json'), JSON.stringify(jsonStats));
  });
}
