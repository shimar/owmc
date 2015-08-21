var React          = require('react');
var ReactPropTypes = React.PropTypes;

var Coord = React.createClass({

  propTypes: {
    coord: ReactPropTypes.object.isRequired
  },

  render: function() {
    return (
      <p>
        <i className="fa fa-location-arrow fa-lg"></i>&nbsp;
        {this.props.coord.lat}, {this.props.coord.lon}
      </p>
    );
  }
});

module.exports = Coord;
