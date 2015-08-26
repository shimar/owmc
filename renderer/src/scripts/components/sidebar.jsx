var React = require('react');
var SearchBox = require('./search_box.jsx');
var Weather = require('./weather/weather.jsx');

var WeatherStore = require('../stores/weather_store');

var queryTypes = [
  { type: 0, caption: 'City Name', placeholder: 'ex. Kawasaki,JP' },
  { type: 1, caption: 'ID',        placeholder: 'ex. 1859642' },
  { type: 2, caption: 'Location',  placeholder: 'ex. lat=35.9&lon=139,0' }
];

function getWeatherState() {
  return {
    weather: WeatherStore.get()
  };
}

function getState() {
  return {
    weather:        WeatherStore.get(),
    queryText:      '',
    queryTypeIndex: 0
  };
}

var Sidebar = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    WeatherStore.addChangeListener(this._onWeatherChange);
  },

  componentWillUnmount: function() {
    WeatherStore.removeChangeListener(this._onWeatherChange);
  },

  _onWeatherChange: function() {
    this.setState(getState());
  },

  // for searchbox.
  _onUserInput: function(queryText) {
    var state = getState();
    state.queryText = queryText;
    this.setState(state);
  },

  render: function() {
    return (
      <div className="sidebar-nav container">
        <div className="row">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <i className="wi wi-day-sunny fa-3x"></i>
            </div>
            <div className="brand-name">OWMC</div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <SearchBox queryType={queryTypes[this.state.queryTypeIndex]}
                       queryTypes={queryTypes}
                       value={this.state.queryText}
                       onUserInput={this._onUserInput} />
          </div>
        </div>
        <Weather weather={this.state.weather} />
      </div>
    );
  }
});

module.exports = Sidebar;
