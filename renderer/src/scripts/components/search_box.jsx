var _     = require('lodash');
var React = require('react');
var ReactPropTypes = React.PropTypes;

var WeatherActionCreator = require('../actions/weather_action_creator');

var queryTypes = [
  { type: 0, caption: 'City Name', placeholder: 'ex. Kawasaki,JP' },
  { type: 1, caption: 'ID',        placeholder: 'ex. 1859642' },
  { type: 2, caption: 'Location',  placeholder: 'ex. lat=35.9&lon=139,0' }
];

var SearchBox = React.createClass({

  propTypes: {
    queryType:   ReactPropTypes.number,
    caption:     ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    value:       ReactPropTypes.string
  },

  getDefaultProps: function() {
    var queryType = queryTypes[0];
    return {
      queryType:   queryType.type,
      caption:     queryType.caption,
      placeholder: queryType.placeholder,
      value:       ''
    };
  },

  _onQueryTextChange: function(event) {
    this.props.onUserInput(
      this.refs.textInput.getDOMNode().value
    );
  },

  _onClickQueryType: function(event) {
    var src = $(event.target);
    this._changeQueryType(src.text());
  },

  _changeQueryType: function(caption) {
    var queryType = _.find(queryTypes, function(queryType) {
      return queryType.caption === caption;
    });
    this.props.queryType = queryType.type;
    this.props.caption   = queryType.caption;
    this.props.placeholder = queryType.placeholer;
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
    return (
      <div id="search-box">
        <div className="input-group">
          <div className="input-group-btn">
            <button type="button"
              className="btn btn-default dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expands="false">
              {this.props.caption}
              &nbsp;<span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              <li><a href="#" onClick={this._onClickQueryType}>ID</a></li>
              <li><a href="#" onClick={this._onClickQueryType}>City Name</a></li>
              <li><a href="#" onClick={this._onClickQueryType}>Location</a></li>
            </ul>
          </div>
          <input type="text"
            className="form-control"
            placeholder={this.props.placeholder}
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
