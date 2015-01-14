'use strict';

var path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['', '.js' , '.jsx', '.css']
  },
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public/assets'),
    publicPath: '/assets/',
    filename: 'scripts.[hash].js',
  },
  module: {
    loaders: [
      {test: /\.(jsx|js)$/, exclude: /node_modules/, loader: '6to5-loader?runtime=true'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('css-loader!less-loader')},
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
