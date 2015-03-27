var R = require('react');
var D = R.DOM;
var Header = require('../shared/header');
var Graph = require('./graph');
var LSOAMap = require('../shared/lsoaMap');

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
    var geoJSON   = JSON.parse(data.lsoa.geometry);
    var crimeData = data.lsoa.crimes;
    var lsoaName  = data.lsoa.name;

    return D.section({ className: 'criminality-results results', style: style },
      D.section(null,
        R.createElement(Header, { text: 'Total number of crime for the LSOA ' + lsoaName }),
        D.section(null,
          R.createElement(LSOAMap, { lsoaGeoJSON: geoJSON }),
          R.createElement(Graph, { crimeData: crimeData })
        )
      )
    );
  }
});

module.exports = Results;
