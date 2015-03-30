var R = require('react');
var D = R.DOM;
var Header = require('../shared/header');
var LSOAMap = require('../shared/lsoaMap');
var config = require('../../config');
var Statistics = require('./statistics');

var Results = R.createClass({
  displayName: 'demographics-results',
  propTypes: {
    show: R.PropTypes.bool,
    data: R.PropTypes.object
  },

  render: function() {
    if (!this.props.data) { return D.div(); }
    var style     = this.props.show ? {} : { display: 'none' };
    var data      = this.props.data;
    var geoJSON   = JSON.parse(data.lsoa.geometry);
    var popData   = data.lsoa.population;
    var lsoaName  = data.lsoa.name;
    var sectionEl;

    if (config.mapboxMapId) {
      sectionEl = D.section(null,
        R.createElement(LSOAMap, { lsoaGeoJSON: geoJSON, size: 'half'}),
        R.createElement(Statistics, { popData: popData, size: 'half' })
      );
    } else {
      sectionEl = D.section(null,
        R.createElement(Statistics, { popData: popData, size: 'full' })
      );
    }

    return D.section({ className: 'demographics-results results', style: style },
      D.section(null,
        R.createElement(Header, { text: 'Demographics data for the LSOA ' + lsoaName }),
        sectionEl
      )
    );
  }
});

module.exports = Results;
