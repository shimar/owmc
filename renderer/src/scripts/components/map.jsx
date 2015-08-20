var React = require('react');

var Map = React.createClass({

  componentDidMount: function() {
    new ol3.Map({
      target: 'map',
      controls: ol3.control.defaults({
        attribution: false,
        rotate: false,
        zoom: false
      }),
      layers: [
        new ol3.layer.Tile({
          source: new ol3.source.OSM({})
        })
      ],
      view: new ol3.View({
        center: ol3.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
        zoom:   8
      })
    });
  },

  render: function() {
    return (
      <div id="map" ref="map"></div>
    );
  }
});

module.exports = Map;
