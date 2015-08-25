var Sidebar   = require('./sidebar.jsx');
var MainBlock = require('./main_block.jsx');

var React = require('react');

var OwmcApp = React.createClass({
  render: function() {
    return (
      <div id="wrapper">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="contents">
          <MainBlock />
        </div>
      </div>
    );
  }
});

module.exports = OwmcApp;
