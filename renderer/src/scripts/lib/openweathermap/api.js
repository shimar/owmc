var WeatherActionCreator        = require('../../actions/weather_action_creator');
var WeatherReceiveActionCreator = require('../../actions/weather_receive_action_creator');
var CityReceiveActionCreator    = require('../../actions/city_receive_action_creator');

var Endpoints = require('./endpoints');

function buildQueryStringForWeather(queryType, queryString) {
  var str = '';
  switch (queryType) {
  case 0:
    str = 'q=' + queryString;
    break;
  case 1:
    str = 'id=' + queryString;
    break
  case 2:
    str = queryString;
  default:
    break;
  }
  return str;
}

function buildQueryStringForCity(queryType, queryString) {
  var str = 'type=accurate&';
  switch (queryType) {
  case 0:
    str = 'q=' + queryString;
    break;
  case 2:
    str = queryString;
  default:
    break;
  }
  return str;
}

function buildURLForWeather(queryType, queryString) {
  var url = Endpoints.weather();
  url += '?';
  url += buildQueryStringForWeather(queryType, queryString);
  url += '&units=metric';
  return url;
}

function buildURLForCity(queryType, queryString) {
  var url = Endpoints.city();
  url += '?';
  url += buildQueryStringForCity(queryType, queryString);
  url += '&units=metric';
  return url;
}

function buildURLForForecast(queryType, queryString) {
  var url = Endpoints.forecast();
  url += '?';
  // query parameters are same to weather api.
  url += buildQueryStringForWeather(queryType, queryString);
  url += '&units=metric';
  return url;
}

function buildURLForDailyForecast(queryType, queryString) {
  var url = Endpoints.dailyForecast();
  url += '?';
  // query parameters are same to weather api.
  url += buildQueryStringForWeather(queryType, queryString);
  url += '&units=metric';
  return url;
}


var OpenWeatherMapApi = {
  getWeather: function(queryType, queryText) {
    $.get(buildURLForWeather(queryType, queryText), function(data) {
      WeatherReceiveActionCreator.receiveWeather(data);
    });
  },

  findCity: function(queryType, queryText, callback) {
    $.get(buildURLForCity(queryType, queryText), callback);
  },

  getForecast: function(qeuryType, queryText) {
    $.get(buildURLForForecast(queryType, queryText), function(data) {
      console.log(data);
      // TODO
    });
  },

  getDailyForecast: function(queryType, queryText) {
    $.get(buildURLForDailyForecast(queryType, queryText), function(data) {
      console.log(data);
      // TODO
    });
  }
};

module.exports = OpenWeatherMapApi;
