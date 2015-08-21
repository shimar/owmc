var Endpoints = require('./endpoints');

var Icon = {
  icon: function(icon) {
    return Endpoints.icon() + '/' + icon + '.png';
  }
};
module.exports = Icon;
