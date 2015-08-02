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
    templateUrl: 'main.html'
  })
  .otherwise({
    redirectTo: '/'
  });
})
.run(function() {
});
