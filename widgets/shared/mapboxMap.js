/* global L */

var R = require('react');
var RDOM = require('react-dom');
var D = R.DOM;
var config = require('../../config');

require('mapbox.js');
// L is provided by mapbox
var mb = L.mapbox;

var MapboxMap = R.createClass({
  displayName: 'map',

  propTypes: {
    size: R.PropTypes.oneOf(['half', 'full']),
    geoJSON: R.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      map: null,
      layer: null
    };
  },

  componentDidMount: function() {
    mb.accessToken = config.mapboxToken;
    var map = mb.map(this.refs.map, config.mapboxMapId);
    map.scrollWheelZoom.disable();
    map.dragging.disable();
    var layer = mb.featureLayer().addTo(map);
    this.setState({
      map: map,
      layer: layer
    });
  },

  componentDidUpdate: function() {
    this.state.layer.setGeoJSON(this.props.geoJSON);
    this.state.map.fitBounds(this.state.layer.getBounds());
  },


  render: function() {
    var className = 'map-container col ' +
      (this.props.size === 'half' ? 'span_6_of_12' : 'span_12_of_12');
    return D.div({ className: className },
      D.div({ className: 'map', ref: 'map' })
    );
  }
});

module.exports = MapboxMap;
