var AppDispatcher = require('../dispatcher/app_dispatcher');
var OwmcConstants = require('../constants/owmc_constants');
var OpenWeatherMapApi = require('../lib/openweathermap/api');

var ActionTypes = OwmcConstants.ActionTypes;

module.exports = {
  findCity: function(queryType, queryText) {
    AppDispatcher.dispatch({
      type:      ActionTypes.FIND_CITY,
      queryType: queryType,
      queryText: queryText
    });
    OpenWeatherMapApi.findCity(queryType, queryText);
  }
};
