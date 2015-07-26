'use strict';

var app = angular.module('OwmcApp');
var ctrl = function($scope, OpenWeatherMap) {

  console.log('MainController loaded');


  var params = {
    id:    1859642,
    APPID: 'Your API KEY'
  };
  OpenWeatherMap.currentWeather(params).then(function(data) {
    console.log(data);
  });

};

app.controller(
  'MainController',
  [
    '$scope',
    'OpenWeatherMap',
    ctrl
  ]);
