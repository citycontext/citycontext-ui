var R = require('react');
var D = R.DOM;
var Phase = require('./phase');
var Types = R.PropTypes;

var List = R.createClass({
  displayName: 'schools-list',

  propTypes: {
    size: Types.oneOf(['half', 'full']),
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
          expanded: self.props.size === 'full'
        });
        acc.push(phaseEl);
      }
      return acc;
    }, []);
  },

  render: function() {
    var className = 'school-list-container col ' +
      (this.props.size === 'half' ? 'span_6_of_12' : 'span_12_of_12');

    var args = [{ className: className }];

    this.getPhases().forEach(function(phase) {
      args.push(phase);
    });

    return D.div.apply(this, args);
  }
});

module.exports = List;
