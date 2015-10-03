var React          = require('react');
var ReactPropTypes = React.PropTypes;

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

    return (
      <div className="forecast-data-block col-xs-4 col-sm-8 col-md-8">
        <div className="forecast">
        </div>
      </div>
    );
  }

});
module.exports = Forecast;
