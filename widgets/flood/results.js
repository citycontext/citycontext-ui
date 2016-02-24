var R = require('react');
var D = R.DOM;
var Header = require('../shared/header');
var MapboxMap = require('../shared/mapboxMap');
var config = require('../../config');
var Description = require('./description');

var Results = R.createClass({
  displayName: 'flood-results',
  propTypes: {
    show: R.PropTypes.bool,
    data: R.PropTypes.object
  },

  render: function() {
    var data      = this.props.data;
    var style     = this.props.show ? {} : { display: 'none' };
    var floodData = data && data.floodRisk;
    var isAtRisk  = data && data.isAtRisk;
    var sectionEl;
    var header;

    if (!data) { return D.div(null); }

    if (config.mapboxMapId && isAtRisk) {
      sectionEl = D.section(null,
        R.createElement(MapboxMap, { geoJSON: floodData.geometry, size: 'half'}),
        R.createElement(Description, { floodData: floodData, isAtRisk: isAtRisk, size: 'half' })
      );
    } else {
      sectionEl = D.section(null,
        R.createElement(Description, { floodData: floodData, isAtRisk: isAtRisk, size: 'full' })
      );
    }

    if (data.location) {
      header = 'Flood risk for location ' + '@' + data.location.lat + "," + data.location.lon;
    } else {
      header = 'Flood risk';
    }

    return D.section({ className: 'results', style: style },
      D.section(null,
        R.createElement(Header, { text: header }),
        sectionEl
      )
    );
  }
});

module.exports = Results;
