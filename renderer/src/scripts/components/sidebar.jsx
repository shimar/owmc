var _ = require('lodash');
var React = require('react');

// components
var SearchBox = require('./search_box.jsx');
var Cities    = require('./cities.jsx');
var Weather   = require('./weather/weather.jsx');

// actions
var WeatherActionCreator  = require('../actions/weather_action_creator');
var FindCityActionCreator = require('../actions/find_city_action_creator');

// stores
var WeatherStore = require('../stores/weather_store');

var queryTypes = [
  { type: 0, caption: 'City Name', placeholder: 'ex. Kawasaki,JP' },
  { type: 1, caption: 'ID',        placeholder: 'ex. 1859642' },
  { type: 2, caption: 'Location',  placeholder: 'ex. lat=35.9&lon=139,0' }
];

function getState() {
  return {
    weather:        WeatherStore.getWeather(),
    cities:         WeatherStore.getCities(),
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
    this.setState({
      weather:   WeatherStore.getWeather(),
      cities:    WeatherStore.getCities(),
      queryText: '',
      searching: false
    });
  },

  // for searchbox.
  _onUserInput: function(queryText) {
    this.setState({queryText: queryText});
  },

  _onQueryTypeClick: function(envet) {
    var caption = event.target.firstChild.nodeValue;
    var selectedQueryTypeIndex = _.findIndex(queryTypes, function(item) {
      return item.caption == caption;
    });
    this.setState({ queryTypeIndex: selectedQueryTypeIndex });
  },

  _onSearch: function(event) {
    if (this.state.queryText.trim()) {
      this.setState({ searching: true });
      var queryType = queryTypes[this.state.queryTypeIndex];

      // TODO
      // id以外のパラメータで検索される場合は、はじめに都市をfindする。
      // 結果リストを並べてリンクとして表示、つつくと詳細表示。
      if (queryType.type === 1) {
        WeatherActionCreator.getWeather(queryType.type, this.state.queryText.trim());
      } else {
        FindCityActionCreator.findCity(queryType.type, this.state.queryText.trim());
      }
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
        <Cities cities={this.state.cities} />
        <Weather weather={this.state.weather} searching={this.state.searching} />
      </div>
    );
  }
});

module.exports = Sidebar;
