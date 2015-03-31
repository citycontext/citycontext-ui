var R = require('react');
var D = R.DOM;
var Phase = require('./phase');
var Types = R.PropTypes;

var List = R.createClass({
  displayName: 'schools-list',

  propTypes: {
    activeURNs: Types.arrayOf(Types.number).isRequired,
    schools: Types.arrayOf(Types.object).isRequired
  },

  getPhases: function() {
    var phaseNames = [
      'Nursery',
      'Primary',
      'Secondary',
      'Special',
      'PRU (Pupil Referral Unit)'
    ];

    var self = this;

    return phaseNames.reduce(function(acc, phaseName) {
      var schoolsInPhase = self.props.schools.filter(function(school) {
        return school.phase === phaseName;
      });

      if (schoolsInPhase.length) {
        var phaseEl = R.createElement(Phase, {
          schools: schoolsInPhase,
          name: phaseName,
          activeURNs: self.props.activeURNs,
        });
        acc.push(phaseEl);
      }
      return acc;
    }, []);
  },

  render: function() {
    var args = [{ className: 'list-container col span_5_of_12' }];

    this.getPhases().forEach(function(phase) {
      args.push(phase);
    });

    return D.div.apply(this, args);
  }
});

module.exports = List;
