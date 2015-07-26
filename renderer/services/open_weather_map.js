'use strict';

var app = angular.module('OwmcApp');

var service = function() {
  console.log('OpenWeatherMap loaded');
  return {};
};

app.factory('OpenWeatherMap', [service]);
