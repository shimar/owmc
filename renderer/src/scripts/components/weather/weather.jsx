var React          = require('react');
var ReactPropTypes = React.PropTypes;

var Summary     = require('./summary.jsx');
var Coord       = require('./coord.jsx');
var Timestamp   = require('./timestamp.jsx');
var WeatherMain = require('./weather_main.jsx');
var Wind        = require('./wind.jsx');

var Weather = React.createClass({

  propTypes: {
    weather: ReactPropTypes.object.isRequired
  },

  render: function() {
    if (Object.keys(this.props.weather).length < 1) {
      return null;
    }

    return (
      <div className="row weather">
        <div className="col-xs-12 col-sm-12 col-md-12 text-center">
          <h2>{this.props.weather.name},{this.props.weather.sys.country}</h2>
          <Coord coord={this.props.weather.coord} />
          <Timestamp timestamp={this.props.weather.dt} />
          <Summary weather={this.props.weather.weather[0]} clouds={this.props.weather.clouds} />
          <WeatherMain main={this.props.weather.main} />
          <Wind wind={this.props.weather.wind} />
        </div>
      </div>
    );
  }
});

module.exports = Weather;
