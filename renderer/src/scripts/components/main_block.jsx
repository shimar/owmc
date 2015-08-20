var React = require('react');

var SearchBox = require('./search_box.jsx');

var MainBlock = React.createClass({

    render: function() {
      return (
        <div className="container-fluid">
          <SearchBox />
        </div>
      );
    }

});

module.exports = MainBlock;
