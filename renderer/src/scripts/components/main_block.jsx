var React = require('react');
var _ = require('lodash');

// components.
var Map       = require('./map.jsx');
var SearchBox = require('./search_box.jsx');
var Cities    = require('./cities.jsx');
var Weather   = require('./weather/weather.jsx');
var Forecast  = require('./forecast/forecast.jsx');

// query types.
var queryTypes = [
  { type: 0, caption: 'City Name', placeholder: 'ex. Kawasaki,JP' },
  { type: 1, caption: 'ID',        placeholder: 'ex. 1859642' },
  { type: 2, caption: 'Location',  placeholder: 'ex. lat=35.9&lon=139,0' }
];

// actions
var WeatherActionCreator  = require('../actions/weather_action_creator');
var FindCityActionCreator = require('../actions/find_city_action_creator');

// stores.
var WeatherStore  = require('../stores/weather_store');
var ForecastStore = require('../stores/forecast_store');

function getState() {
  return {
    weather:        WeatherStore.getWeather(),
    cities:         WeatherStore.getCities(),
    forecast:       ForecastStore.get(),
    queryText:      '',
    queryTypeIndex: 0,
    searching:      false
  }
}

var MainBlock = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    WeatherStore.addChangeListener(this._onWeatherChange);
    ForecastStore.addChangeListener(this._onForecastChange);
  },

  componentWillUnmount: function() {
    ForecastStore.removeChangeListener(this._onForecastChange);
    WeatherStore.removeChangeListener(this._onWeatherChange);
  },

  _onWeatherChange: function() {
    this.setState({
      weather:   WeatherStore.getWeather(),
      cities:    WeatherStore.getCities(),
      forecast:  {},
      queryText: '',
      searching: false
    });
  },

  _onForecastChange: function() {
    this.setState({
      forecast: ForecastStore.get()
    });
  },

  _onUserInput: function(queryText) {
    this.setState({ queryText: queryText });
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
      <div className="container-fluid">
        <div id="main-overlay">
          <SearchBox queryType={queryTypes[this.state.queryTypeIndex]}
                    queryTypes={queryTypes}
                    value={this.state.queryText}
                    onUserInput={this._onUserInput}
                    onQueryTypeClick={this._onQueryTypeClick}
                    onSearch={this._onSearch}
                    searching={this.state.searching} />
          <div className="row-fluid">
            <Cities cities={this.state.cities} />
            <Weather weather={this.state.weather} searching={this.state.searching} />
            <Forecast forecast={this.state.forecast} />
          </div>
        </div>
        <Map />
      </div>
    );
  }

});

module.exports = MainBlock;
