var AppDispatcher = require('../dispatcher/app_dispatcher');
var OwmcConstants = require('../constants/owmc_constants');
var OpenWeatherMapApi = require('../lib/openweathermap/api');

var ActionTypes = OomcConstants.ActionTypes;

module.exports = {
  findCity: function(queryType, queryText) {
    AppDispatcher.dispatch({
      type:      ActionTypes.FIND_CITY,
      queryType: queryType,
      queryText: queryText
    });
    OpenWeatherMapApi.getWeather(queryType, queryText);
  }
};
