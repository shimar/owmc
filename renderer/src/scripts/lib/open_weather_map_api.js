var WeatherReceiveActionCreator = require('../actions/weather_receive_action_creator');

var APIEndpoints = {
  baseUrl: 'http://api.openweathermap.org',
  version: '/data/2.5',

  weather: function() {
    var path = '/weather';
    return this.baseUrl + this.version + path;
  },

  forecast: function() {
    var path = '/forecast';
    return this.baseUrl + this.version + path;
  },

  dailyForcast: function() {
    var path = '/forecast/daily';
    return this.baseUrl + this.version + path;
  }
};

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

function buildURLForWeather(queryType, queryString) {
  var url = APIEndpoints.weather();
  url += '?';
  url += buildQueryStringForWeather(queryType, queryString);
  url += '&units=metric';
  return url;
}

var OpenWeatherMapApi = {
  getWeather: function(queryType, queryText) {
    $.get(buildURLForWeather(queryType, queryText), function(data) {
      WeatherReceiveActionCreator.receiveWeather(data);
    });
  }
};

module.exports = OpenWeatherMapApi;
