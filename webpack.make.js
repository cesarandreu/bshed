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
  var publicPath = PRODUCTION ? '/assets/' : 'http://localhost:8080/assets/',
    outputPath = path.join(__dirname, 'public', RENDERER ? 'renderer' : 'assets');

  // base
  var config = {
    externals: [],
    module: {
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
    // resolveLoader: {
    //   root: path.join(__dirname, 'node_modules')
    // },
    resolve: {
      // root: path.join(__dirname, 'client'),
      extensions: ['', '.js', '.jsx']
      // modulesDirectories: ['node_modules']
    },
    plugins: [
      StatsPlugin(publicPath, outputPath),
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(ENV)})
    ]
  };

  // Source maps
  config.devtool = PRODUCTION ? 'source-map' : 'eval-source-map';

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
    Array.prototype.push.apply(config.externals, [
      'react',
      'fluxible',
      'superagent',
      'react-router',
      'serialize-javascript'
    ]);
  }

  // loaders
  var babelLoader = 'babel?experimental&optional=selfContained';

  // Webpack fails at parsing generator functions :(
  // babelLoader += RENDERER ? '&blacklist=regenerator' : '';

  config.module.loaders.push({
    test: /\.js$/,
    loader: babelLoader,
    exclude: /.*node_modules.*/
  });

  var hotLoader = PRODUCTION || RENDERER ? '' : 'react-hot!';
  config.module.loaders.push({
    test: /\.jsx$/,
    loader: hotLoader + babelLoader,
    exclude: /.*node_modules.*((?!\.jsx).{4}$)/
  });

  var lessLoader = 'css?sourceMap!autoprefixer!less?sourceMap';
  config.module.loaders.push({
    test: /\.less$/,
    loader: PRODUCTION ? ExtractTextPlugin.extract(lessLoader) : 'style!' + lessLoader
  });

  // target
  config.target = RENDERER ? 'node' : 'web';

  // plugins

  // Ensures requires for `react` and `react/addons` normalize to the same requirement
  var reactRegex = /^react(\/addons)?$/, reactAddonsPath = require.resolve('react/addons');
  config.plugins.push(new webpack.NormalModuleReplacementPlugin(reactRegex, reactAddonsPath));

  if (PRODUCTION) {
    // var cssName = PRODUCTION ? 'scripts.[hash].css' : 'scripts.dev.css'
    config.plugins.push(new ExtractTextPlugin('scripts.[hash].css'));
  }
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

function StatsPlugin (publicPath, outputPath) {
  return function () {
    this.plugin('done', saveStats);
  };

  function saveStats (stats) {
    var jsonStats = stats.toJson();
    jsonStats.publicPath = publicPath;
    mkdirp.sync(outputPath);
    fs.writeFileSync(path.join(outputPath, 'stats.json'), JSON.stringify(jsonStats));
  }
}

