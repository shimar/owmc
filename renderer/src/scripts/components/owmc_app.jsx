var Map       = require('./map.jsx');
var Header    = require('./header.jsx');
var MainBlock = require('./main_block.jsx');

var React = require('react');

var OwmcApp = React.createClass({
  render: function() {
    return (
      <div id="wrapper">
        <Map />
        <div className="contents">
          <Header />
          <MainBlock />
        </div>
      </div>
    );
  }
});

module.exports = OwmcApp;
