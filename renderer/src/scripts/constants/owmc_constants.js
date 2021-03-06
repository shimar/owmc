var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    GET_WEATHER:     null,
    RECEIVE_WEATHER: null,

    FIND_CITY:       null,
    RECEIVE_CITIES:  null,
    UPDATE_COORD:    null,

    GET_FORECAST:           null,
    RECEIVE_FORECAST:       null,

    GET_DAILY_FORECAST:     null,
    RECEIVE_DAILY_FORECAST: null
  })
};
