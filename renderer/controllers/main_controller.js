'use strict';

var app = angular.module('OwmcApp');
var ctrl = function($scope, OpenWeatherMap) {
  $scope.weatherLoaded = false;
  $scope.weather = null;
  $scope.center  = {
    zoom: 12
  };
  $scope.defaults = {
    controls: {
      zoom: false
    }
  };

  var params = {
    id:    1859642,             // kawasaki
    APPID: '26695d71e886d9477a5ac106cbc2e631'
  };

  OpenWeatherMap.weather(params).then(function(data) {
    $scope.weather = data;
    $scope.center.lat = data.coord.lat;
    $scope.center.lon = data.coord.lon;
    $scope.weatherLoaded = true;
  });

};

app.controller(
  'MainController',
  [
    '$scope',
    'OpenWeatherMap',
    ctrl
  ]);
