var React = require('react');

var SearchBox = React.createClass({
  render: function() {
    return (
      <div id="search-box" className="row">
        <div className="col-sm-12 col-md-6">
          <div className="input-group">
            <div className="input-group-btn">
              <button type="button"
                className="btn btn-default dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expands="false">
                City Name
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li><a href="#">ID</a></li>
                <li><a href="#">City Name</a></li>
                <li><a href="#">Lat, Lng</a></li>
              </ul>
            </div>
            <input type="text" className="form-control" />
            <div className="input-group-btn">
              <button type="button" className="btn btn-primary">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchBox;
