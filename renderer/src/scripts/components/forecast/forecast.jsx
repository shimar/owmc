var React          = require('react');
var ReactPropTypes = React.PropTypes;

var moment = require('moment');
var _ = require('lodash');

var OpenWeatherMapIcon = require('../../lib/openweathermap/icon');

var ForecastItem = React.createClass({
  render: function() {
    return (
      <div>
        <div>{moment(this.props.item.dt * 1000).format('YYYY-MM-DD HH:MM:SS')}</div>
        <div><img src={OpenWeatherMapIcon.icon(this.props.item.weather[0].icon)} width='25px' height='25px' /></div>
      </div>
    );
  }
});


var Forecast = React.createClass({

  propTypes: {
    forecast: ReactPropTypes.object
  },

  render: function() {
    if (!this.props.forecast || Object.keys(this.props.forecast).length < 1) {
      return (
        <div className="forecast-data-block col-xs-4 col-sm-8 col-md-8 hide"></div>
      );
    }

    var items = [];
    _.forEach(this.props.forecast.list, function(data) {
      items.push( <ForecastItem key={data.dt} item={data} /> );
    });

    return (
      <div className="forecast-data-block col-xs-4 col-sm-8 col-md-8">
        <div className="forecast">
          {items}
        </div>
      </div>
    );
  }

});
module.exports = Forecast;
