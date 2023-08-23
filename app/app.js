'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'Home',
  'Employee',
  'Login',
  'Driver',
  'Header',
  'myApp.version',
  'DriverServices',
  'Request',
  'Sidebar',
  'RequestHeader'
])
  .config(['$locationProvider', '$routeProvider', '$sceProvider', function ($locationProvider, $routeProvider, $sceProvider) {
    $locationProvider.html5Mode(true);
    $sceProvider.enabled(false);


    $routeProvider
      .when('/home', {
        templateUrl: 'modules/Home/index.html',
        controller: 'HomeController',
        resolve: {
          auth: checkAuthentication
        }
      })
      .when('/request', {
        templateUrl: 'modules/Request/index.html',
        controller: 'RequestController',
        resolve: {
          auth: checkAuthentication
        }
      })
      .when('/employee', {
        templateUrl: 'modules/Employee/index.html',
        controller: 'EmployeeController',
        resolve: {
          auth: checkAuthentication
        }
      })
      .when('/driver', {
        templateUrl: 'modules/Driver/index.html',
        controller: 'DriversController',
        resolve: {
          auth: checkAuthentication
        }
      })
      .when('/driver/:id', {
        templateUrl: 'modules/Driver/driver.html',
        controller: 'DriverController',
        resolve: {
          auth: checkAuthentication
        }
      })
      .when('/login', {
        templateUrl: 'modules/Login/index.html',
        controller: 'LoginController',
      })
      .otherwise({
        redirectTo: () => {
          const token = localStorage.getItem('token');
          if (token !== null) {
            return '/home';
          } else {
            return '/login';
          }
        }
      });
  }]);
