var AppDispatcher     = require('../dispatcher/app_dispatcher');
var OwmcConstants     = require('../constants/owmc_constants');
var OpenWeatherMapApi = require('../lib/openweathermap/api');

var ActionTypes = OwmcConstants.ActionTypes;

module.exports = {
  getWeather: function(queryType, queryText) {
    console.log(queryType, queryText);
    AppDispatcher.dispatch({
      type: ActionTypes.GET_WEATHER,
      queryType: queryType,
      queryText: queryText
    });
    OpenWeatherMapApi.getWeather(queryType, queryText);
  }
};
