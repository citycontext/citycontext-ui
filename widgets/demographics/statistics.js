var R = require('react');
var D = R.DOM;
var U = require('../shared/domUtils.js');

var Statistics = R.createClass({
  displayName: 'demographics-statistics',
  propTypes: {
    size: R.PropTypes.oneOf(['half', 'full']),
    popData: R.PropTypes.object
  },

  render: function() {
    var data = this.props.popData;
    var fields = [
      ['allUsualResidents', 'Total number of residents'],
      ['personsPerHectare', 'Persons per hectare'],
      ['households', 'Number of households'],
      ['personsPerHousehold', 'Persons per household'],
      ['householdResidents', 'Number of household residents'],
      ['communalEstablishmentResidents', 'Number of communal establishment residents']
    ];

    var className = 'data-table col ' +
      (this.props.size === 'half' ? 'span_5_of_12' : 'span_12_of_12');

    return D.div({ className: className }, U.dataTable(data, fields));
  }
});

module.exports = Statistics;
