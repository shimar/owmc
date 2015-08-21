var Endpoints = {
  baseUrl: 'http://api.openweathermap.org',
  version: '/data/2.5',

  weather: function() {
    var path = '/weather';
    return this.baseUrl + this.version + path;
  },

  forecast: function() {
    var path = '/forecast';
    return this.baseUrl + this.version + path;
  },

  dailyForcast: function() {
    var path = '/forecast/daily';
    return this.baseUrl + this.version + path;
  },

  icon: function() {
    return 'http://openweathermap.org/img/w';
  }
};
module.exports = Endpoints;
