var R = require('react');
var RDOM = require('react-dom');
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

  toggleActive: function(urn) {
    var i = this.state.activeURNs.indexOf(urn);
    if (i < 0) {
      this.state.activeURNs.push(urn);
    } else {
      this.state.activeURNs.splice(i, 1);
    }
    this.forceUpdate();
  },

  componentDidMount: function() {
    var results = this;
    RDOM.findDOMNode(this).addEventListener('citycontext-ui.activate-school', function(e) {
      results.toggleActive(e.detail.urn);
      console.log('activate school: ' + e.detail.urn);
    });
  },

  componentWillReceiveProps: function() {
    this.setState({ activeURNs: [] });
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
        'marker-symbol': 'school',
        eventDetail: {
          urn: school.urn
        }
      };

      if (this.isActive(school)) {
        properties['marker-color'] = config.mapMarkersColor;
        properties['marker-size'] = 'large';
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
        'marker-color': config.mapPOIColor,
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
    if (!this.props.data) { return D.section({ className: 'results' }); }

    var style = this.props.show ? {} : { display: 'none' };
    var sectionEl;

    if (config.mapboxMapId) {
      sectionEl = D.section(null,
        R.createElement(MapboxMap, {
          size: 'half',
          geoJSON: this.getGeoJSON(),
          clickEventName: 'citycontext-ui.activate-school'
        }),
        this.schoolListEl()
      );
    } else {
      sectionEl = D.section(null,
        this.schoolListEl()
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
