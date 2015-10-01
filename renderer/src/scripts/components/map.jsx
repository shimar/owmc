var React          = require('react');
var ReactPropTypes = React.PropTypes;

var WeatherStore = require('../stores/weather_store');
var CoordStore   = require('../stores/coord_store');

var _map         = null;
var _vectorLayer = null;

function getWeatherState() {
  var cities  = WeatherStore.getCities();
  var weather = WeatherStore.getWeather();

  var coord   = {
    lat: 0,
    lon: 0
  };

  if (cities.length > 0) {
      coord = cities[0].coord;
  } else {
    if (Object.keys(weather).length > 0) {
      coord.lat = weather.coord.lat;
      coord.lon = weather.coord.lon;
    }
  }
  return coord;
};

function createIconStyle() {
  var iconStyle = new ol3.style.Style({
    image: new ol3.style.Icon(({
      anchor: [0.5, 46],
      anchorXUnits: 'pixels',
      anchorYUnits: 'pixels',
      opacity: 0.75,
      src: 'images/pin32.png'
    }))
  });
  return iconStyle;
};

var Map = React.createClass({

  propTypes: {
    lat: ReactPropTypes.number,
    lon: ReactPropTypes.number
  },

  getDefaultProps: function() {
    return {
      lat: 0,
      lon: 0
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
    CoordStore.addChangeListener(this._onCoordChagne);

    $('#map').height($(window).height());
    _map.updateSize();
    window.onresize = function() {
      $('#map').height($(window).height());
      _map.updateSize();
    };
  },

  componentWillUnmount: function() {
    WeatherState.removeChangeListener(this._onWeatherChange);
  },

  _onWeatherChange: function() {
    this.setState(getWeatherState());
    this._addMarker();
    this._flyTo();
  },

  _onCoordChagne: function() {
    var coord = CoordStore.get();
    this.setState({
      lon: coord.lon,
      lat: coord.lat
    });
    this._addMarker();
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

  _addMarker: function() {
    if (_vectorLayer) {
      _map.removeLayer(_vectorLayer);
    }
    var iconFeature = new ol3.Feature({
      geometry: new ol3.geom.Point(ol3.proj.fromLonLat([this.state.lon, this.state.lat])),
      name: 'pin',
      population: 4000,
      rainfall: 500
    });
    iconFeature.setStyle(createIconStyle());
    var vectorSource = new ol3.source.Vector({
      features: [iconFeature]
    });
    _vectorLayer = new ol3.layer.Vector({
      source: vectorSource
    });
    _map.addLayer(_vectorLayer);
  },

  render: function() {
    return (
      <div id="map" ref="map"></div>
    );
  }
});

module.exports = Map;
