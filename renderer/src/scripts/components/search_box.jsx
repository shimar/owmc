var _     = require('lodash');
var React = require('react');
var ReactPropTypes = React.PropTypes;

var WeatherActionCreator = require('../actions/weather_action_creator');

var SearchBox = React.createClass({

  propTypes: {
    queryType: ReactPropTypes.object,
    value:     ReactPropTypes.string
  },

  _onQueryTextChange: function(event) {
    this.props.onUserInput(
      this.refs.textInput.getDOMNode().value
    );
  },

  _onQueryTypeClick: function(event) {
    event.preventDefault();
    console.log('_onQueryTypeClick');
  },

  _onClickButton: function(event) {
    this._fire();
  },

  _fire: function() {
    if (this.props.value.trim()) {
      WeatherActionCreator.getWeather(this.props.queryType, this.props.value.trim());
    }
  },

  render: function() {
    var queryTypeList = [];
    _.forEach(this.props.queryTypes, function(queryType, index) {
      queryTypeList.push(<li key={index} onClick={this._onQueryTypeClick}><a href='#'>{queryType.caption}</a></li>);
    });

    return (
      <div id="search-box">
        <div className="input-group">
          <div className="input-group-btn">
            <button type="button"
              className="btn btn-default dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expands="false">
              {this.props.queryType.caption}
              &nbsp;<span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              {queryTypeList}
            </ul>
          </div>
          <input type="text"
            className="form-control"
            placeholder={this.props.queryType.placeholder}
            onChange={this._onQueryTextChange}
            value={this.props.value}
            ref="textInput" />
          <div className="input-group-btn">
            <button type="button"
              className="btn btn-primary"
              onClick={this._onClickButton}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchBox;
