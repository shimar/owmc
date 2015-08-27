var _     = require('lodash');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var classNames = require('classnames');

var ENTER_KEY_CODE = 13;

var SearchBox = React.createClass({

  propTypes: {
    queryType: ReactPropTypes.object,
    value:     ReactPropTypes.string,
    searching: ReactPropTypes.bool
  },

  _onQueryTextChange: function(event) {
    this.props.onUserInput(
      this.refs.textInput.getDOMNode().value
    );
  },

  _onClickButton: function(event) {
    this._fire(event);
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._fire(event);
    }
  },

  _fire: function(event) {
    this.props.onSearch(event);
  },

  render: function() {
    var queryTypeList = [];
    var handler = this.props.onQueryTypeClick;
    _.forEach(this.props.queryTypes, function(queryType, index) {
      queryTypeList.push(<li key={index} onClick={handler}><a href='#'>{queryType.caption}</a></li>);
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
            onKeyDown={this._onKeyDown}
            value={this.props.value}
            ref="textInput" />
          <div className="input-group-btn">
            <button type="button"
              className="btn btn-primary"
              onClick={this._onClickButton}>
              <i className={classNames('fa',
                {'fa-search': !this.props.searching, 'fa-spinner': this.props.searching, 'fa-spin': this.props.searching }
              )}></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchBox;
