var React = require('react');

var SearchBox = require('./search_box.jsx');
var Weather   = require('./weather.jsx');

var MainBlock = React.createClass({

    render: function() {
      return (
        <div className="container-fluid">
          <SearchBox />
          <Weather />
        </div>
      );
    }

});

module.exports = MainBlock;
