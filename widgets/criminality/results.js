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
    var style = this.props.show ? {} : { display: 'none' };
    var geoJSON = JSON.parse(this.props.data.lsoa.geometry);
    var crimeData = this.props.data.lsoa.crimes;

    return D.section({ className: 'criminality-results', style: style },
      D.section(null,
        R.createElement(Header, { text: 'Criminality results' }),
        D.section(null,
          R.createElement(LSOAMap, { lsoaGeoJSON: geoJSON }),
          R.createElement(Graph, { crimeData: crimeData })
        )
      )
    );
  }
});

module.exports = Results;
