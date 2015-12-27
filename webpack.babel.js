/**
 * Webpack configuration
 */
import webpack from 'webpack'
import cssnext from 'cssnext'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import ExtractTextPlugin from 'extract-text-webpack-plugin'

export function buildWebpackConfig () {
  // Environment
  const NODE_ENV = process.env.NODE_ENV || 'development'
  const CLIENT_ENV = process.env.CLIENT_ENV || 'development'

  // Build type
  const {
    DEVELOPMENT,
    PRODUCTION,
    TEST
  } = {
    DEVELOPMENT: CLIENT_ENV === 'development',
    PRODUCTION: CLIENT_ENV === 'production',
    TEST: CLIENT_ENV === 'test'
  }

  // Configuration object
  const config = {
    context: __dirname,

    entry: DEVELOPMENT || PRODUCTION
      ? {
        app: './client/config/bootstrap.js'
      }
      : {},

    output: TEST
      ? {}
      : {
        filename: '[name].js',
        // publicPath: '/',
        publicPath: DEVELOPMENT ? 'http://localhost:9000/' : '/',
        pathinfo: DEVELOPMENT || TEST,
        path: __dirname + '/build/assets'
      },

    devtool: PRODUCTION
      ? 'source-map'
      : 'cheap-module-source-map',

    module: {
      loaders: [{
        test: /\.js$/,
        // include: /(client|shared)/,
        ignore: /node_modules/,
        loader: 'babel'
      // }, {
      //   test: /\.(png|jpg|jpeg|gif|svg|woff|ttf|eot)$/,
      //   loader: 'file'
      }, {
        test: /\.css$/,
        include: /client/,
        loaders: PRODUCTION
          ? ['style', 'css?modules&importLoaders=1', 'postcss']
          : ['style', 'css?modules&importLoaders=1&localIdentName=[name]-[local]', 'postcss']
      }]
    },

    postcss: [
      cssnext({
        browsers: ['last 2 versions'],
        import: false
      })
    ],

    devServer: {
      contentBase: __dirname + '/build/assets',

      historyApiFallback: true,

      proxy: [{
        path: /(graphql|graphiql|images)/,
        target: 'http://localhost:3000'
      }],

      port: 9000,
      stats: {
        modules: false,
        cached: false,
        chunk: false
      }
    },

    plugins: [
      // new ExtractTextPlugin('[name].[hash].css', {
      //   disable: DEVELOPMENT || TEST
      // }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      }),

      new HtmlWebpackPlugin({
        hash: PRODUCTION || DEVELOPMENT,
        inject: true,
        templateContent: getHtmlTemplate()
      })

      // ...(
      //   PRODUCTION || DEVELOPMENT
      //     ? [
      //       new HtmlWebpackPlugin({
      //         templateContent: getHtmlTemplate(),
      //         inject: true
      //       })
      //     ]
      //     : []
      // ),

      // ...(
      //   PRODUCTION
      //     ? [
      //       new webpack.optimize.DedupePlugin(),
      //       new webpack.optimize.UglifyJsPlugin()
      //     ]
      //     : []
      // )
    ]
  }

  return config
}

export function getHtmlTemplate () {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charSet='utf-8'/>
    <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
    <meta name='viewport'
      content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' />
    <meta name='description' content='An app for bikeshedding'/>
    <base href='/'>
    <link href='//fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,500italic,500,700,700italic' rel='stylesheet' type='text/css'>
    <title>bshed</title>
  </head>
  <body>
  </body>
</html>`
}

export default buildWebpackConfig()
