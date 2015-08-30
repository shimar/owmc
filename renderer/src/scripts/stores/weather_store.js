var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter  = require('events').EventEmitter;
var OwmcConstants = require('../constants/owmc_constants');
var assign        = require('object-assign');

var ActionTypes   = OwmcConstants.ActionTypes;
var CHANGE_EVENT  = 'change';

var _weather = {};
var _cities  = [];

/**
 * 天気情報を更新する。
 */
function update(weather) {
  _weather = weather;
}

/**
 * 都市リストを更新する。
 */
function updateCities(cities) {
  _cities = cities;
}

var WeatherStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _weather;
  },

  getWeather: function() {
    return _weather;
  },

  getCities: function() {
    return _cities;
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
    //update({});
    //WeatherStore.emitChange();
    break;

  case ActionTypes.RECEIVE_WEATHER:
    update(action.weather);
    WeatherStore.emitChange();
    break;

  case ActionTypes.RECEIVE_CITIES:
    updateCities(action.cities);
    WeatherStore.emitChange();
    break;

  default:
    break;
  }
});

module.exports = WeatherStore;
