var R = require('react');
var RDOM = require('react-dom');
var D = R.DOM;
var Header = require('../shared/header');
var MapboxMap = require('../shared/mapboxMap');
var config = require('../../config');
var modeMarkers = require('./modeMarkers');
var colors = require('../shared/colors');

var Results = R.createClass({
  displayName: 'transport-results',
  propTypes: {
    show: R.PropTypes.bool,
    data: R.PropTypes.object
  },

  eventName: 'citycontext-ui.select-station',

  getInitialState: function() {
    return {
      activeGroup: null
    };
  },

  componentDidMount: function() {
    var that = this;
    RDOM.findDOMNode(this).addEventListener(this.eventName, function(e) {
      console.log(e);
      that.state.activeGroup = e.detail.activeGroup;
      that.forceUpdate();
    });
  },

  componentWillReceiveProps: function() {
    this.setState({ activeGroup: null });
  },

  marker: function(group) {
    return modeMarkers[group.mode] || 'marker-stroked';
  },

  getGeoJSON: function() {
    var props = this.props;
    var state = this.state;
    var stopGroups = props.data.transportStops;
    var location = props.data.location;
    var features = [];

    var isActive = function(group) {
      state.activeGroup &&
        state.activeGroup.name === group.name &&
        state.activeGroup.naptanTypeCode === group.naptanTypeCode
    };

    stopGroups
      .filter(function(group) {
        return !isActive(group)
      }, this)
      .forEach(function(group) {
        features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [group.centroid.lon, group.centroid.lat],
          },
          properties: {
            'marker-symbol': this.marker(group),
            eventDetail: {
              activeGroup: group
            }
          }
        });
      }, this);

    if (state.activeGroup) {
      var group = state.activeGroup;
      group.stops.forEach(function(stop) {
        features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [stop.location.lon, stop.location.lat]
          },
          properties: {
            'marker-symbol': this.marker(state.activeGroup),
            'marker-color': config.mapMarkersColor
          }
        });
      }, this);
      var centroid = group.centroid;
      var distanceMiles = (group.closest.distanceMetres / 1609.344).toPrecision(2).toString();
      var description = group.mode + '<br>' +
                        group.stops.length + ' entrances <br>' +
                        'Closest entrance at <strong> ' + distanceMiles + ' miles</strong>';
      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [centroid.lon, centroid.lat]
        },
        properties: {
          'marker-symbol': 'circle-stroked',
          'marker-color': config.mapMarkersColor,
          title: group.name,
          description: description,
          openPopup: true
        }
      });
    }

    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [location.lon, location.lat],
      },
      properties: {
        'marker-color': config.mapPOIColor,
        'marker-style': 'solid'
      }
    });

    return {
      type: 'FeatureCollection',
      features: features
    };
  },

  render: function() {
    if (!this.props.data) { return D.section({ className: 'results' }); }

    var style = this.props.show ? {} : { display: 'none' };
    var sectionEl;
    var eventName = this.eventName;

    if (config.mapboxMapId) {
      sectionEl = D.section(null,
        R.createElement(MapboxMap, {
          size: 'half',
          geoJSON: this.getGeoJSON(),
          clickEventName: eventName
        })
      );
    } else {
      //TODO
    }

    return D.section({ className: 'results', style: style },
      D.section(null,
        R.createElement(Header, { text: 'Nearby public transport stops' }),
        sectionEl
      )
    );
  }
});

module.exports = Results;
