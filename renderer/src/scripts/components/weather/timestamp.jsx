var React          = require('react');
var ReactPropTypes = React.PropTypes;

var moment = require('moment');

var Timestamp = React.createClass({

  propTypes: {
    timestamp: ReactPropTypes.number.isRequired
  },

  render: function() {
    return (
      <p>
        {moment(this.props.timestamp * 1000).fromNow()}
      </p>
    );
  }
});

module.exports = Timestamp;
