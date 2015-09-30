var AppDispatcher = require('../dispatcher/app_dispatcher');
var OwmcConstants = require('../constants/owmc_constants');
var OpenWeatherMapApi = require('../lib/openweathermap/api');
var WeatherActionCreator = require('./weather_action_creator');
var CityReceiveActionCreator = require('./city_receive_action_creator');

var ActionTypes = OwmcConstants.ActionTypes;

module.exports = {
  findCity: function(queryType, queryText) {
    OpenWeatherMapApi.findCity(queryType, queryText, function(data) {
      if (data.list.length == 1) {
        WeatherActionCreator.getWeather(1, data.list[0].id);
      } else  if (data.list.length > 1) {
        CityReceiveActionCreator.receiveCities(data.list);
      } else {
        // TODO - respond empty list.
        CityReceiveActionCreator.receiveCities([]);
      }
    });
  }
};
