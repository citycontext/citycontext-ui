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

    var className = 'demographics-statistics col ' +
      (this.props.size === 'half' ? 'span_6_of_12' : 'span_12_of_12');

    var args = fields.reduce(function(acc, fs) {
      var key     = fs[0];
      var label   = fs[1];
      var titleEl = D.dt(null, label);
      var valueEl = D.dd(null, data[key]);
      acc.push(titleEl);
      acc.push(valueEl);
      return acc;
    }, [{ className: className }]);


    return D.div.apply(this, args);
  }
});

module.exports = Statistics;
