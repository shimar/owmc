'use strict';

var app = angular.module('OwmcApp');

var service = function($http, OpenWeatherMapAPIEndpoint) {

  var buildURLForWeather = function(params) {
    var url = OpenWeatherMapAPIEndpoint.weatherData;
    url += '?id=' + params.id;
    url += '&units=metric';
    url += '&APPID=' + params.APPID;
    return url;
  };

  /**
   * This function wraps the Current Weather Data API.
   * @params {object} params
   */
  var weather = function(params) {
    return $http.get(buildURLForWeather(params)).then(function(response) {
             return response.data;
           });
  };

  /**
   * This function wraps the 5 day / 3 hour forecast API.
   * @params {object} params
   */
  var forecast5Day = function(params) {
    // TODO
  };

  /**
   * This function wraps the 16 day forecast API.
   * @params {object} params
   */
  var forecast16Day = function(params) {
    // TODO
  };

  return {
    weather: weather
  };

};

app.factory('OpenWeatherMap',
            ['$http',
             'OpenWeatherMapAPIEndpoint',
             service]);
