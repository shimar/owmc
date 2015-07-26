'use strict';

var app = angular.module('OwmcApp');
var ctrl = function($scope, OpenWeatherMap) {
  $scope.weather = null;
  var params = {
    id:    1859642,             // kawasaki
    APPID: '26695d71e886d9477a5ac106cbc2e631'       // appid
  };
  OpenWeatherMap.weather(params).then(function(data) {
    $scope.weather = data;
  });

};

app.controller(
  'MainController',
  [
    '$scope',
    'OpenWeatherMap',
    ctrl
  ]);
