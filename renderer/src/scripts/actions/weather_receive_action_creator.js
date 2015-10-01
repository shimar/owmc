var AppDispatcher     = require('../dispatcher/app_dispatcher');
var OwmcConstants     = require('../constants/owmc_constants');

var ActionTypes = OwmcConstants.ActionTypes;

module.exports = {
  receiveWeather: function(weather) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_WEATHER,
      weather: weather
    });
    // TODO call the forecast api with the weathers' id.
    // OpenWeatherMapApi.getForecast(1, id);
  }
};
