var Map       = require('./map.jsx');
var Header    = require('./header.jsx');
var MainBlock = require('./main_block.jsx');

var React = require('react');

var OwmcApp = React.createClass({
  render: function() {
    return (
      <div id="wrapper">
        <Map />
        <Header />
        <MainBlock />
      </div>
    );
  }
});

module.exports = OwmcApp;
