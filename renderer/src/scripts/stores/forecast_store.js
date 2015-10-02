var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter  = require('events').EventEmitter;
var OwmcConstants = require('../constants/owmc_constants');
var assign        = require('object-assign');

var ActionTypes   = OwmcConstants.ActionTypes;
var CHANGE_EVENT  = 'change';

var _forecast = {};

function update(forecast) {
  _forecast = forecast;
}

var ForecastStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _forecast;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

ForecastStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {
  case ActionTypes.RECEIVE_FORECAST:
    update(action.forecast);
    ForecastStore.emitChange();
    break;
  default:
    break;
  };
});

modue.exports = ForecastStore;
