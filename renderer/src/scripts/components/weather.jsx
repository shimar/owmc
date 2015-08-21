var React = require('react');

var Weather = React.createClass({

  render: function() {
    return (
      <div className="row weather">
        <div className="col-sm-12 col-md-4">
          <div className="panel panel-default text-center">
            <div className="panel-body">
              <h2></h2>
              <p></p>
              <div className="row">
                <p></p>
              </div>
              <div className="row">
                <p></p>
              </div>
              <div className="row">
                <p></p>
              </div>
              <div className="row">
                <p></p>
              </div>
              <div className="row">
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Weather;
