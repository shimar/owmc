var React          = require('react');
var ReactPropTypes = React.PropTypes;

var moment = require('moment');
var _ = require('lodash');

var OpenWeatherMapIcon = require('../../lib/openweathermap/icon');

var ForecastItem = React.createClass({
  render: function() {
    return (
      <div className="forecast-item pull-left text-center">
        <div>{moment(this.props.item.dt * 1000).format('DD')}</div>
        <div>{moment(this.props.item.dt * 1000).format('MMM')}</div>
        <div>{moment(this.props.item.dt * 1000).format('HH:mm')}</div>
        <div><img src={OpenWeatherMapIcon.icon(this.props.item.weather[0].icon)} width='32px' height='32px' /></div>
        <div>
          {this.props.item.main.temp}
          <i className="wi wi-celsius fa-lg"></i>
        </div>
        <div>
          {this.props.item.main.pressure}
        </div>
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
        <div className="forecast-data-block col-xs-9 col-sm-9 col-md-9 hide"></div>
      );
    }

    var items = [];
    _.forEach(this.props.forecast.list.slice(0,9), function(data) {
      items.push( <ForecastItem key={data.dt} item={data} /> );
    });

    return (
      <div className="forecast-data-block col-xs-9 col-sm-9 col-md-9">
        <div className="forecast">
          <div className="forecast-pane clearfix">
            {items}
          </div>
        </div>
      </div>
    );
  }

});
module.exports = Forecast;
