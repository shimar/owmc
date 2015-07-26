'use strict';

var app = angular.module('OwmcApp');
var ctrl = function($scope, OpenWeatherMap) {
  $scope.weather = null;
  var params = {
    id:    1859642,             // kawasaki
    APPID: 'Your API Key'       // appid
  };
  OpenWeatherMap.weather(params).then(function(data) {
    $scope.weather = data;
    console.log($scope.weather);
  });

};

app.controller(
  'MainController',
  [
    '$scope',
    'OpenWeatherMap',
    ctrl
  ]);
