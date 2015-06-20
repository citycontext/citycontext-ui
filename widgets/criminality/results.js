var R = require('react');
var D = R.DOM;
var Header = require('../shared/header');
var Graph = require('./graph');
var MapboxMap = require('../shared/mapboxMap');
var config = require('../../config');

var Results = R.createClass({
  displayName: 'criminality-results',
  propTypes: {
    show: R.PropTypes.bool,
    data: R.PropTypes.object
  },

  render: function() {
    if (!this.props.data) { return D.div(); }
    var style     = this.props.show ? {} : { display: 'none' };
    var data      = this.props.data;
    var geoJSON   = data.lsoa.geometry;
    var crimeData = data.lsoa.crimes;
    var lsoaName  = data.lsoa.name;
    var sectionEl;

    if (config.mapboxMapId) {
      sectionEl = D.section(null,
        R.createElement(MapboxMap, { geoJSON: geoJSON, size: 'half'}),
        R.createElement(Graph, { crimeData: crimeData, size: 'half' })
      );
    } else {
      sectionEl = D.section(null,
        R.createElement(Graph, { crimeData: crimeData, size: 'full' })
      );
    }

    return D.section({ className: 'results', style: style },
      D.section(null,
        R.createElement(Header, { text: 'Total number of crimes for the LSOA ' + lsoaName }),
        sectionEl
      )
    );
  }
});

module.exports = Results;
