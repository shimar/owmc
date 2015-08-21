var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter  = require('events').EventEmitter;
var OwmcConstants = require('../constants/owmc_constants');
var assign        = require('object-assign');

var ActionTypes   = OwmcConstants.ActionTypes;

var CHANGE_EVENT  = 'change';

var _weather = {};

function update(weather) {
  _weather = weather;
}

var WeatherStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _weather;
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

WeatherStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {
  case ActionTypes.GET_WEATHER:
    WeatherStore.emitChange();
    break;
  case ActionTypes.RECEIVE_WEATHER:
    update(action.weather);
    WeatherStore.emitChange();
    break;
  default:
    break;
  }
});
module.exports = WeatherStore;
