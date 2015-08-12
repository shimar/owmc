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

  $scope.params = {
    id:    1859642,             // kawasaki
    APPID: 'Your API KEY'
  };

  /**
   * OpenWeatherMap APIをコールし、天気情報をロードする。
   */
  $scope.load = function() {
    OpenWeatherMap.weather($scope.params).then(function(data) {
      $scope.weather    = data;
      $scope.center.lat = data.coord.lat;
      $scope.center.lon = data.coord.lon;
      $scope.weatherLoaded = true;
    });
  };
  $scope.load();


};

app.controller(
  'MainController',
  [
    '$scope',
    'OpenWeatherMap',
    ctrl
  ]);
