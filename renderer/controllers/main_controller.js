'use strict';

var app = angular.module('OwmcApp');
var ctrl = function($scope, OpenWeatherMap) {

  $scope.weatherLoaded = false;
  $scope.weather = null;
  $scope.center  = {
    zoom: 10
  };

  $scope.defaults = {
    controls: {
      zoom: false
    }
  };

  $scope.layers = [
    {
      name:   'Rain',
      active: false,
      source: {
        type: 'OSM',
        url:  'http://{a-c}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png'
      }
    }
  ];

  $scope.params = {
    query: 'id=1859642',
    units: 'metric',
    APPID: 'Your API KEY'
  };

  /**
   * OpenWeatherMap APIをコールし、天気情報をロードする。
   */
  $scope.load = function() {
    $scope.resetErrorMessage();
    OpenWeatherMap.weather($scope.params).then(function(data) {
      if (data.cod == "200") {
        $scope.weather    = data;
        $scope.center.lat = data.coord.lat;
        $scope.center.lon = data.coord.lon;
        $scope.center.zoom = 10;
        $scope.weatherLoaded = true;
      } else {
        $scope.errorMessage = data.message;
      }
    });
  };

  $scope.search = function() {
    $scope.load();
  };

  $scope.hasErrorMessage = function() {
    return $scope.errorMessage && $scope.errorMessage.length > 0;
  };
  $scope.resetErrorMessage = function() {
    $scope.errorMessage = null;
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
