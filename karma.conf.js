var assign = require("lodash.assign");

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha'],

    files: [
      'specs/main.js'
    ],

    exclude: [],

    preprocessors: {
      'specs/main.js': ['webpack']
    },

    webpack: assign(require('./webpack.config.js'), {
      debug: true,
      devtool: 'eval'
    }),

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    captureTimeout: 60000,

    singleRun: false
  });
};
