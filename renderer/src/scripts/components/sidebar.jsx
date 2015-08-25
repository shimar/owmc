var React = require('react');
var SearchBox = require('./search_box.jsx');
var Weather = require('./weather/weather.jsx');

var WeatherStore = require('../stores/weather_store');

function getWeatherState() {
  return {
    weather: WeatherStore.get()
  };
}

var Sidebar = React.createClass({

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
      <div className="sidebar-nav container">
        <div className="row">
          <div className="sidebar-brand">OWMC</div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <SearchBox />
          </div>
        </div>
        <Weather weather={this.state.weather}/>
      </div>
    );
  }
});

module.exports = Sidebar;
