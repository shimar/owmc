var React = require('react');

var SearchBox = require('./search_box.jsx');
var Weather   = require('./weather.jsx');

var WeatherStore = require('../stores/weather_store');

function getWeatherState() {
  return {
    weather: WeatherStore.get()
  };
}

var MainBlock = React.createClass({

  getInitialState: function() {
    return getWeatherState();
  },

  componentDidMount: function() {
    WeatherStore.addChangeListener(this._onWeatherChange);
  },

  componentWillUnmount: function() {
    WeatherStore.removeChangeListener(this._onWeatherChange);
  },

  _onWeatherChange: function() {
    this.setState(getWeatherState());
  },

  render: function() {
    return (
      <div className="container-fluid">
        <SearchBox />
        <Weather weather={this.state.weather}/>
      </div>
    );
  }

});

module.exports = MainBlock;
