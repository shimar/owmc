var _ = require('lodash');
var React          = require('react');
var ReactPropTypes = React.PropTypes;

var CityItem = React.createClass({
  render: function() {
    return (
      <li className="list-group-item clearfix">
        <div className="pull-left">{this.props.city.name}</div>
        <div className="pull-right">
          <i className="fa fa-location-arrow"></i>
          &nbsp;
          <i className="fa fa-chevron-right"></i>
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
        <CityItem city={city} />
      );
    });

    return (
      <div className="row">
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
