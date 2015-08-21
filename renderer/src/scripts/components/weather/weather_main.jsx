var React          = require('react');
var ReactPropTypes = React.PropTypes;

var WeatherMain = React.createClass({

  propTypes: {
    main: ReactPropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="row">
        <p>
          <i className="wi wi-thermometer fa-lg"></i>&nbsp;
          {this.props.main.temp}
          <i className="wi wi-celsius fa-lg"></i>
        </p>
        <p>
          <i className="wi wi-humidity fa-lg"></i>&nbsp;
          {this.props.main.humidity} ％
        </p>
        <p>
          {this.props.main.pressure} hPa
        </p>
      </div>
    );
  }

});

module.exports = WeatherMain;
