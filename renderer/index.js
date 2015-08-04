'use strict';

angular.module('OwmcApp', [
  'ngRoute',
  'ui.bootstrap',
  'openlayers-directive'
])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'MainController',
    templateUrl: 'main/index.html'
  })
  .when('/settings', {
    controller: 'SettingsController',
    templateUrl: 'settings/index.html'
  })
  .otherwise({
    redirectTo: '/'
  });
})
.run(function() {
});
