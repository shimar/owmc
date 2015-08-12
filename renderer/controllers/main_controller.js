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

  $scope.params = {
    query: 'id=1859642',
    units: 'metric',
    APPID: 'Your API KEY'
  };

  /**
   * OpenWeatherMap APIをコールし、天気情報をロードする。
   */
  $scope.load = function() {
    OpenWeatherMap.weather($scope.params).then(function(data) {
      if (data.cod == "200") {
        $scope.weather    = data;
        $scope.center.lat = data.coord.lat;
        $scope.center.lon = data.coord.lon;
        $scope.center.zoom = 10;
        $scope.weatherLoaded = true;
        console.log($scope.weather.weather[0].icon);
      } else {
        // TODO show error message.
      }
    });
  };

  $scope.search = function() {
    $scope.load();
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
