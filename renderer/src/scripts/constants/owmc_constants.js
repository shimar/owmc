var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    GET_WEATHER:     null,
    RECEIVE_WEATHER: null,
    FIND_CITY:       null,
    RECEIVE_CITIES:  null
  })
};
