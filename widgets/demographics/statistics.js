var R = require('react');
var D = R.DOM;

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

    var className = 'statistics col ' +
      (this.props.size === 'half' ? 'span_5_of_12' : 'span_12_of_12');

    var rows = fields.reduce(function(acc, fs) {
      var key     = fs[0];
      var label   = fs[1];
      var titleEl = D.td(null, label);
      var valueEl = D.td(null, data[key]);
      var rowEl   = D.tr(null, titleEl, valueEl);
      acc.push(rowEl);
      return acc;
    }, [null]);

    var tableEl = D.table(null,
      D.tbody.apply(this, rows)
    );

    return D.div({ className: className }, tableEl);
  }
});

module.exports = Statistics;
