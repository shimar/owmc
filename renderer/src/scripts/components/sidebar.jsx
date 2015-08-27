var React = require('react');
var _ = require('lodash');
var SearchBox = require('./search_box.jsx');
var Weather = require('./weather/weather.jsx');

var WeatherActionCreator = require('../actions/weather_action_creator');
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
    queryTypeIndex: 0,
    searching:      false
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
    var state = getState();
    state.searching = false;
    this.setState(state);
    console.log(state);
  },

  // for searchbox.
  _onUserInput: function(queryText) {
    var state = getState();
    state.queryText = queryText;
    this.setState(state);
  },

  _onQueryTypeClick: function(envet) {
    var caption = event.target.firstChild.nodeValue;
    var selectedQueryTypeIndex = _.findIndex(queryTypes, function(item) {
      return item.caption == caption;
    });
    var state = getState();
    state.queryTypeIndex = selectedQueryTypeIndex;
    this.setState(state);
  },

  _onSearch: function(event) {
    if (this.state.queryText.trim()) {
      var state = getState();
      state.searching = true;
      this.setState(state);
      var queryType = queryTypes[this.state.queryTypeIndex];
      WeatherActionCreator.getWeather(queryType.type, this.state.queryText.trim());
    }
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
                      onUserInput={this._onUserInput}
                      onQueryTypeClick={this._onQueryTypeClick}
                      onSearch={this._onSearch}
                      searching={this.state.searching} />
          </div>
        </div>
        <Weather weather={this.state.weather} searching={this.state.searching} />
      </div>
    );
  }
});

module.exports = Sidebar;
