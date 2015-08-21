var React = require('react');

var OpenWeatherMapApi = ('./lib/open_weather_map_api');
var OwmcApp = require('./components/owmc_app.jsx');
React.render(
  <OwmcApp />,
  document.getElementById('owmc-app')
);
