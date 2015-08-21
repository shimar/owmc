var React          = require('react');
var ReactPropTypes = React.PropTypes;

var Wind = React.createClass({

  propTypes: {
    wind: ReactPropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="row">
        <p>
          {this.props.wind.deg}° &nbsp; {this.props.wind.speed} m/s
        </p>
      </div>
    );
  }
});

module.exports = Wind;
