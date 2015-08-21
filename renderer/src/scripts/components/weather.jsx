var React          = require('react');
var ReactPropTypes = React.PropTypes;

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
        <div className="col-xs-12 col-sm-4 col-md-4">
          <div className="panel panel-default text-center">
            <div className="panel-body">
              <h2>{this.props.weather.name},{this.props.weather.sys.country}</h2>
              <p>
                <i className="fa fa-location-arrow fa-lg"></i>
                &nbsp;{this.props.weather.coord.lat}, {this.props.weather.coord.lon}
                <br />
                {this.props.weather.dt * 1000}
              </p>
              <div className="row">
                <p>
                  <h4>{this.props.weather.weather[0].main}</h4>
                  <p>
                    {this.props.weather.weather[0].description}
                    &nbsp;({this.props.weather.clouds.all}％)
                  </p>
                </p>
              </div>
              <div className="row">
                <p>
                  <i className="wi wi-thermometer fa-lg"></i>
                  &nbsp;{this.props.weather.main.temp}
                  <i className="wi wi-celsius fa-lg"></i>
                </p>
              </div>
              <div className="row">
                <p>
                  <i className="wi wi-humidity fa-lg"></i>
                  &nbsp;{this.props.weather.main.humidity}％
                </p>
              </div>
              <div className="row">
                <p>
                  {this.props.weather.main.pressure} hPa
                </p>
              </div>
              <div className="row">
                <p>
                  {this.props.weather.wind.deg}°
                  <br />
                  {this.props.weather.wind.speed} m/s
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Weather;
