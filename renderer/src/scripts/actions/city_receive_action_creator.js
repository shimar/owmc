var AppDispatcher = require('../dispatcher/app_dispatcher');
var OwmcConstants = require('../constants/owmc_constants');

var ActionTypes = OwmcConstants.ActionTypes;

module.exports = {
  receiveCities: function(cities) {
    AppDispatcher.dispatch({
      type:   ActionTypes.RECEIVE_CITIES,
      cities: cities
    });
  }
};
