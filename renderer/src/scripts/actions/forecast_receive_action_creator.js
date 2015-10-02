var AppDispatcher     = require('../dispatcher/app_dispatcher');
var OwmcConstants     = require('../constants/owmc_constants');

var ActionTypes = OwmcConstants.ActionTypes;

module.exports = {
  receiveForecast: function(forecast) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_FORECAST,
      forecast: forecast
    });
  }
};
