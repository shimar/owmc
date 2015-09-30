var AppDispatcher = require('../dispatcher/app_dispatcher');
var OwmcConstants = require('../constants/owmc_constants');

var ActionTypes = OwmcConstants.ActionTypes;

module.exports = {
  updateCoord: function(coord) {
    AppDispatcher.dispatch({
      type:  ActionTypes.UPDATE_COORD,
      coord: coord
    });
  }
};
