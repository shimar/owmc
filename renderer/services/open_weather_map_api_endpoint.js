'use strict';

app.constant('OWMBaseURL',    'http://api.openweathermap.org');
app.constant('OWMApiVerPath', '/data/2.5');

var service = function(OWMBaseURL, OWMApiVerPath) {

  var apiBaseURL = OWMBaseURL + OWMApiVerPath;

  var currentWeatherData = apiBaseURL + '/weather';
  var forecast5Day3Hour  = apiBaseURL + '/forecast';
  var forecast16Day      = apiBaseURL + '/forecast/daily'

  return {
    weatherData:   currentWeatherData,
    forecast5Day:  forecast5Day3Hour,
    forecast16Day: forecast16Day
  };
};

app.factory('OpenWeatherMapAPIEndpoint',
            ['OWMBaseURL',
             'OWMApiVerPath',
             service]);
