var React          = require('react');
var ReactPropTypes = React.PropTypes;

var Summary = React.createClass({

  propTypes: {
    weather: ReactPropTypes.object.isRequired,
    clouds:  ReactPropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="row">
        <h4>{this.props.weather.main}</h4>
        <p>
          {this.props.weather.description} ({this.props.clouds.all}％)
        </p>
      </div>
    );
  }

});

module.exports = Summary;
