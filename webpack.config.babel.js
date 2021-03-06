/**
 * Webpack configuration
 */
import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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
        publicPath: DEVELOPMENT ? 'http://localhost:9000/' : '/',
        pathinfo: DEVELOPMENT || TEST,
        path: path.join(__dirname, 'build', 'client')
      },

    // Switch to cheap-module-source-map if cheap-module-eval-source-map works poorly
    devtool: PRODUCTION
      ? 'source-map'
      : 'cheap-module-eval-source-map',

    module: {
      loaders: [{
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'shared')
        ],
        loader: 'babel'
      // }, {
      //   test: /\.(png|jpg|jpeg|gif|svg|woff|ttf|eot)$/,
      //   loader: 'file'
      }, {
        test: /\.css$/,
        include: [
          path.join(__dirname, 'client')
        ],
        loaders: PRODUCTION
          ? ['style', 'css?modules&importLoaders=1', 'postcss']
          : ['style', 'css?modules&importLoaders=1&localIdentName=[name]-[local]', 'postcss']
      }]
    },

    // This is supposed to improve performance a little
    resolve: {
      moduleDirectories: [
        'node_modules'
      ],
      root: [
        path.join(__dirname, 'client'),
        path.join(__dirname, 'shared')
      ]
    },

    postcss: [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ],

    devServer: {
      contentBase: path.join(__dirname, 'build', 'client'),

      historyApiFallback: true,

      proxy: [{
        path: /(graphql|graphiql|images)/,
        target: 'http://localhost:3000'
      }],

      port: 9000
    },

    plugins: [
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
