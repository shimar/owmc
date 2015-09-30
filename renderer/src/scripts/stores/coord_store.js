var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter  = require('events').EventEmitter;
var OwmcConstants = require('../constants/owmc_constants');
var assign        = require('object-assign');

var ActionTypes   = OwmcConstants.ActionTypes;
var CHANGE_EVENT  = 'change';

var _coord = null;

function update(coord) {
  _coord = coord;
}

var CoordStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _coord;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENET);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

CoordStore.dispatchToken = AppDispatcher.register(function(action)) {
  swtich (action.type) {
  case ActionTypes.UPDATE_COORD:
    update(action.coord);
    CoordStore.emitChange();
    break;
  default:
    break;
  }
};

module.exports = CoordStore;
