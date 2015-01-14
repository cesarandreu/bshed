'use strict';

var path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  resolve: {
    extensions: ['', '.js' , '.jsx']
  },
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public/assets'),
    publicPath: '/assets/',
    filename: 'scripts.[hash].js',
  },
  module: {
    loaders: [
      {test: /\.(jsx|js)$/, exclude: /.*node_modules.*((?!\.jsx).{4}$)/, loader: '6to5-loader?runtime&experimental'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap!less-loader?sourceMap')},
      {test: /\.eot$/, loader: 'url-loader'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextPlugin('styles.[hash].css')
  ]
};

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'sourcemap';
}

module.exports = config;
