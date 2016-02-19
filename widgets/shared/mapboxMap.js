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
    geoJSON: R.PropTypes.object.isRequired,
    clickEventName: R.PropTypes.string
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
    var that = this;
    map.scrollWheelZoom.disable();
    map.dragging.disable();
    var layer = mb.featureLayer().addTo(map);
    layer.on('click', function(e) {
      if (that.props.clickEventName && e.layer.feature.properties.eventDetail) {
        e.originalEvent.preventDefault();
        console.log(e.layer.feature.properties);

        var event = new CustomEvent(
          that.props.clickEventName,
          {
            detail: e.layer.feature.properties.eventDetail,
            bubbles: true
          }
        );

        RDOM.findDOMNode(that).dispatchEvent(event);
      }
    });
    this.setState({
      map: map,
      layer: layer
    });
  },

  componentDidUpdate: function() {
    this.state.layer.setGeoJSON(this.props.geoJSON);
    this.state.map.fitBounds(this.state.layer.getBounds());
    this.state.layer.eachLayer(function(l) {
      if (l.feature.properties.openPopup) {
        l.openPopup();
      }
    });
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
