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
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      {test: /\.(jsx|js)$/, exclude: /node_modules/, loader: '6to5-loader?runtime=true'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextPlugin('styles.[hash].css', {allChunks: true})
  ]
};
