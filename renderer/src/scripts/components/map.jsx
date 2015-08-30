var React          = require('react');
var ReactPropTypes = React.PropTypes;

var WeatherStore = require('../stores/weather_store');

var _map         = null;
var _iconFeature = null;
var _iconStyle   = null;

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
}

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
    iconFeature = new ol3.Feature({
      geometry: new ol3.geom.Point([0, 0]),
      name: 'Name is a name',
      population: 4000,
      rainfall: 500
    });

    iconStyle = new ol3.style.Style({
      image: new ol3.style.Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'images/pin32.png'
      }))
    });
    iconFeature.setStyle(iconStyle);

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
    iconFeature.setGeometry(new ol3.geom.Point([this.state.lon, this.state.lat]));
    var vectorSource = new ol3.source.Vector({
      features: [iconFeature]
    });

    var vectorLayer = new ol3.layer.Vector({
      source: vectorSource
    });
    _map.addLayer(vectorLayer);
    console.log(vectorLayer);

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
