/* global L */

var R = require('react');
var D = R.DOM;
var config = require('../../config');

require('mapbox.js');
// L is provided by mapbox
var mb = L.mapbox;

var LSOAMap = R.createClass({
  displayName: 'lsoa-map',
  propTypes: {
    lsoaGeoJSON: R.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      map: null,
      lsoaLayer: null
    };
  },

  componentDidMount: function() {
    mb.accessToken = config.mapboxToken;
    var map = mb.map(R.findDOMNode(this.refs.map), config.mapboxMapId);
    var lsoaLayer = mb.featureLayer().addTo(map);
    this.setState({
      map: map,
      lsoaLayer: lsoaLayer
    });
  },

  componentDidUpdate: function() {
    this.state.lsoaLayer.setGeoJSON(this.props.lsoaGeoJSON);
    this.state.map.fitBounds(this.state.lsoaLayer.getBounds());
  },

  render: function() {
    var className = 'criminality-map-container map-container ' +
      (this.props.size === 'half' ? 'span_6_of_12' : 'span_12_of_12');
    return D.div({ className: className },
      D.div({ className: 'map', ref: 'map' })
    );
  }
});

module.exports = LSOAMap;
