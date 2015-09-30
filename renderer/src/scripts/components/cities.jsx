var _ = require('lodash');
var React          = require('react');
var ReactPropTypes = React.PropTypes;
var WeatherActionCreator = require('../actions/weather_action_creator');
var CoordActionCreator   = require('../actions/coord_action_creator');

var CityItem = React.createClass({

  _onNameClick: function(event) {
    // TODO - the cityId is contained in this.props.city.
    var reactId = event.target.getAttribute('data-reactId');
    var re = /\$[0-9]+/;
    if (re.test(reactId)) {
      var cityId = reactId.match(re)[0].replace(/\$/, '');
      WeatherActionCreator.getWeather(1, cityId);
    }
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
      <li className="list-group-item clearfix">
        <div className="pull-left">
          <a href='#' onClick={this._onNameClick}>{this.props.city.name}</a>
        </div>
        <div className="pull-right">
          <a href='#' onClick={this._onLocationArrowClick}><i className="fa fa-location-arrow"></i></a>
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
        <div className="row"></div>
      );
    }

    return (
      <div className="row cities">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <ul className="list-group">
            {items}
          </ul>
        </div>
      </div>
    );
  }

});
module.exports = Cities;
