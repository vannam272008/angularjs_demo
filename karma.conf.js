//jshint strict: false
module.exports = function (config) {
  config.set({

    basePath: './',

    files: [
      'lib/angular/angular.js',
      'lib/angular-route/angular-route.js',
      'lib/augular-loader/angular-loader.js',
      'lib/angular-mock/angular-mock.js',
      'core/**/*.js',
      'view*/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox', 'Edge'],

    plugins: [
      'karma-npm s-launcher',
      'karma-firefox-launcher',
      'karma-edge-launcher',
      'karma-jasmine'
    ]

  });
};
