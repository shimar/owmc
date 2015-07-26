'use strict';

var app = angular.module('OwmcApp');

app.constant('OpenWeatherMapURL', 'http://api.openweathermap.org');

var service = function($http, OpenWeatherMapURL) {

  var buildURL = function(params) {
    var url = OpenWeatherMapURL + '/data/2.5/weather?';
    url += 'id=' + params.id;
    url += 'APPID=' + params.APPID;
    return url;
  };

  var weather = function(params) {
    return $http.get(buildURL(params)).then(function(response) {
             return response.data;
           });
  };

  return {
    weather: weather
  };

};

app.factory('OpenWeatherMap',
            ['$http',
             'OpenWeatherMapURL',
             service]);
