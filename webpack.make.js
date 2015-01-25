var fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function buildWebpackConfig (options) {
  options = options || {};

  var ENV = options.ENV || process.env.NODE_ENV || 'development',
    PRODUCTION = options.PRODUCTION || ENV === 'production',
    RENDERER = !!options.renderer;

  // shared values
  var publicPath = PRODUCTION ? '/assets/' : 'http://localhost:2992/assets/',
    outputPath = path.join(__dirname, 'public', RENDERER ? 'renderer' : 'assets');

  // base
  var config = {
    devtool: 'sourcemap',
    externals: [],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: '6to5-loader?runtime&experimental',
        exclude: /.*node_modules.*/
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.(woff)$/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader'
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!autoprefixer-loader!less-loader?sourceMap')
      }]
    },
    // resolveLoader: {
    //   root: path.join(__dirname, 'node_modules')
    // },
    resolve: {
      // root: path.join(__dirname, 'client'),
      extensions: ['', '.js' , '.jsx'],
      // modulesDirectories: ['node_modules']
    },
    plugins: [
      function statsPlugin () {
        function statsPluginDone (stats) {
          var jsonStats = stats.toJson();
          jsonStats.publicPath = publicPath;
          mkdirp.sync(outputPath);
          fs.writeFileSync(path.join(outputPath, 'stats.json'), JSON.stringify(jsonStats));
        }
        if (!RENDERER) this.plugin('done', statsPluginDone);
      },
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(ENV)}),
      new ExtractTextPlugin(PRODUCTION ? 'scripts.[hash].css' : 'scripts.dev.css')
    ]
  };

  // entry
  config.entry = {
    scripts: RENDERER ? './client/renderer.js' : './client/index.js'
  };

  // output
  config.output = {
    path: outputPath,
    pathinfo: !PRODUCTION,
    publicPath: publicPath,
    libraryTarget: RENDERER ? 'commonjs2' : 'var',
    filename: RENDERER ? 'renderer.js' : PRODUCTION ? 'scripts.[hash].js' : 'scripts.dev.js'
  };

  // externals
  if (RENDERER) {
    config.externals.push('superagent');
  }

  // loaders
  var hotLoader = PRODUCTION || RENDERER ? '' : 'react-hot-loader!';
  config.module.loaders.push({
    test: /\.jsx$/,
    loader: hotLoader + '6to5-loader?runtime&experimental',
    exclude: /.*node_modules.*((?!\.jsx).{4}$)/
  });

  // target
  config.target = RENDERER ? 'node' : 'web';

  // plugins
  if (!RENDERER) {
    config.plugins.push(
      new webpack.PrefetchPlugin('react'),
      new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
    );
  }
  if (PRODUCTION && !RENDERER) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin()
    );
  }

  return config;
};
