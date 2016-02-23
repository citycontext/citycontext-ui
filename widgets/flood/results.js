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
    if (!this.props.data) { return D.div(); }
    var style     = this.props.show ? {} : { display: 'none' };
    var data      = this.props.data;
    var floodData = this.props.data.floodRisk;
    var geom      = floodData.geometry;
    var geoJSON   = (typeof geom === "string") ? JSON.parse(geom) : geom;
    var sectionEl;

    if (config.mapboxMapId) {
      sectionEl = D.section(null,
        R.createElement(MapboxMap, { geoJSON: geoJSON, size: 'half'}),
        R.createElement(Description, { floodData: floodData, size: 'half' })
      );
    } else {
      sectionEl = D.section(null,
        R.createElement(Description, { popData: floodData, size: 'full' })
      );
    }

    return D.section({ className: 'results', style: style },
      D.section(null,
        R.createElement(Header, { text: 'Flood risk' }),
        sectionEl
      )
    );
  }
});

module.exports = Results;
