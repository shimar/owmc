var React = require('react');

var Map = require('./map.jsx');

var MainBlock = React.createClass({

  render: function() {
    return (
      <div className="container-fluid">
        <Map />
      </div>
    );
  }

});

module.exports = MainBlock;
