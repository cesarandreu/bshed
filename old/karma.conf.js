module.exports = function karmaConfig (config) {
  config.set({
    frameworks: ['mocha'],

    reporters: ['spec'],

    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'client/**/*.test.*'
    ],

    preprocessors: {
      'client/**/*.test.*': ['webpack', 'sourcemap']
    },

    browsers: ['PhantomJS'],

    singleRun: true,

    plugins: [
      require('karma-mocha'),
      require('karma-webpack'),
      require('karma-spec-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-phantomjs-launcher')
    ],

    webpack: require('./webpack.karma')
  })
}
