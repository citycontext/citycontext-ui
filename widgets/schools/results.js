var R = require('react');
var D = R.DOM;
var Header = require('../shared/header');
var MapboxMap = require('../shared/mapboxMap');
var SchoolsList = require('./list');
var config = require('../../config');

var Results = R.createClass({
  displayName: 'schools-results',
  propTypes: {
    show: R.PropTypes.bool,
    data: R.PropTypes.object
  },

  getInitialState: function() {
    return {
      activeURNs: []
    };
  },

  isActive: function(school) {
    return this.state.activeURNs.indexOf(school.urn) > -1;
  },

  getGeoJSON: function() {
    var schoolsData = this.props.data.schools;
    var location = this.props.data.location;

    var features = schoolsData.map(function(school){
      var properties = {
        title: school.schoolName,
        'marker-symbol': 'school'
      };

      if (this.isActive(school)) {
        properties['marker-color'] = config.mapMarkersColor;
        properties['marker-size']  = 'large';
      }

      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [school.location.lon, school.location.lat],
        },
        properties: properties
      };
    }, this);

    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [location.lon, location.lat],
      },
      properties: {
        'marker-color': config.mapMarkersColor,
        'marker-style': 'solid'
      }
    });

    return {
      type: 'FeatureCollection',
      features: features
    };
  },

  schoolListEl: function(size) {
    return R.createElement(SchoolsList, {
      size: size,
      schools: this.props.data.schools,
      activeURNs: this.state.activeURNs
    });
  },

  render: function() {
    if (!this.props.data) { return D.div(); }
    var style     = this.props.show ? {} : { display: 'none' };
    var sectionEl;

    if (config.mapboxMapId) {
      sectionEl = D.section(null,
        R.createElement(MapboxMap, { size: 'half', geoJSON: this.getGeoJSON() }),
        this.schoolListEl('half')
      );
    } else {
      sectionEl = D.section(null,
        this.schoolListEl('full')
      );
    }

    return D.section({ className: 'results', style: style },
      D.section(null,
        R.createElement(Header, { text: 'Nearby schools' }),
        sectionEl
      )
    );
  }
});

module.exports = Results;

