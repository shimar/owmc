var React          = require('react');
var ReactPropTypes = React.PropTypes;

var WeatherStore = require('../stores/weather_store');

var _map = null;

function getWeatherState() {
  var weather = WeatherStore.get();
  if (Object.keys(weather).length < 1) {
    return {
      lat: 0,
      lon: 0
    };
  }
  return {
    lat: weather.coord.lat,
    lon: weather.coord.lon
  };
}

var Map = React.createClass({

  propTypes: {
    lat: ReactPropTypes.number,
    lon: ReactPropTypes.number
  },

  getDefaultProps: function() {
    return {
      lat: 37.41,
      lon: 8.82
    };
  },

  getInitialState: function() {
    return {
      lat: this.props.lat,
      lon: this.props.lon
    };
  },

  componentDidMount: function() {
    _map = new ol3.Map({
      target: 'map',
      controls: ol3.control.defaults({
        attribution: false,
        rotate: false,
        zoom: false
      }),
      layers: [
        new ol3.layer.Tile({
          preload: 8,
          source: new ol3.source.OSM({})
        })
      ],
      view: new ol3.View({
        center: ol3.proj.fromLonLat([this.state.lon, this.state.lat]),
        zoom:   10
      })
    });
    WeatherStore.addChangeListener(this._onWeatherChange);
    $('#map').height($(window).height());
    _map.updateSize();
  },

  componentWillUnmount: function() {
    WeatherState.removeChangeListener(this._onWeatherChange);
  },

  _onWeatherChange: function() {
    this.setState(getWeatherState());
    this._flyTo();
  },

  _flyTo: function() {
    var view = _map.getView();
    var duration = 2000;
    var start = +new Date();
    var pan = ol3.animation.pan({
      duration: duration,
      source:   view.getCenter(),
      start:    start
    });
    var bounce = ol3.animation.bounce({
      duration: duration,
      resolution: 10 * view.getResolution(),
      start: start
    });
    _map.beforeRender(pan, bounce);
    view.setZoom(10);
    view.setCenter(ol3.proj.fromLonLat([this.state.lon, this.state.lat]));
  },

  render: function() {
    return (
      <div id="map" ref="map"></div>
    );
  }
});

module.exports = Map;
