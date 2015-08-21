var AppDispatcher     = require('../dispatcher/app_dispatcher');
var OwmcConstants     = require('../constants/owmc_constants');

var ActionTypes = OwmcConstants.ActionTypes;

module.exports = {
  receiveWeather: function(weather) {
    console.log(weather);
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_WEATHER,
      weather: weather
    });
  }
};
