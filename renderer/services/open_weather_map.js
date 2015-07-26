'use strict';

var app = angular.module('OwmcApp');

app.constant('OpenWeatherMapURL', 'http://api.openweathermap.org');

var service = function($http, OpenWeatherMapURL) {
  console.log('OpenWeatherMap loaded');

  var buildURL = function(params) {
    var url = OpenWeatherMapURL + '/data/2.5/weather?';
    url += 'id=' + params.id;
    url += 'APPID=' + params.APPID;
    return url;
  };

  var currentWeather = function(params) {
    return $http.get(buildURL(params)).then(function(response) {
             return response.data;
           });
  };

  return {
    currentWeather: currentWeather
  };

};

app.factory('OpenWeatherMap',
            ['$http',
             'OpenWeatherMapURL',
             service]);
