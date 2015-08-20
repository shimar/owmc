var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">OWMC</a>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
