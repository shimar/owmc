var AppDispatcher     = require('../dispatcher/app_dispatcher');
var OwmcConstants     = require('../constants/owmc_constants');
var OpenWeatherMapApi = require('../lib/openweathermap/api');
var ForecastReceiveActionCreator = require('./forecast_receive_action_creator');

var ActionTypes = OwmcConstants.ActionTypes;

module.exports = {
  receiveWeather: function(weather) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_WEATHER,
      weather: weather
    });
    OpenWeatherMapApi.getForecast(1, weather.id, function(data) {
      console.log(data);
      ForecastReceiveActionCreator.receiveForecast(data);
    });
  }
};
