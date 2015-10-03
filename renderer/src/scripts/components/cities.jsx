var _ = require('lodash');
var React          = require('react');
var ReactPropTypes = React.PropTypes;
var WeatherActionCreator = require('../actions/weather_action_creator');
var CoordActionCreator   = require('../actions/coord_action_creator');

var CityItem = React.createClass({

  _onNameClick: function(event) {
    WeatherActionCreator.getWeather(1, this.props.city.id);
  },

  /*
   * 都市リストの位置アイコンクリックハンドラ
   */
  _onLocationArrowClick: function(event) {
    // TODO - fire updating the center of map!
    CoordActionCreator.updateCoord(this.props.city.coord);
  },

  render: function() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-xs-10">
            <a href='#' onClick={this._onNameClick}>{this.props.city.name}</a>
          </div>
          <div className="col-xs-2">
            <a href='#' onClick={this._onLocationArrowClick}><i className="fa fa-location-arrow"></i></a>
          </div>
        </div>
      </li>
    );
  }
});

var Cities = React.createClass({

  propTypes: {
    cities: ReactPropTypes.array
  },

  render: function() {
    var items = [];
    var cities = this.props.cities;
    _.forEach(cities, function(city) {
      items.push(
        <CityItem key={city.id} city={city} />
      );
    });

    if (cities.length === 0) {
      return (
        <div className="col-xs-4 hide"></div>
      );
    }

    return (
      <div className="col-xs-4">
        <div className="cities">
          <ul className="list-group">
            {items}
          </ul>
        </div>
      </div>
    );
  }

});
module.exports = Cities;
