var R = require('react');
var D = R.DOM;
var School = require('./school');

var Phase = R.createClass({
  displayName: 'school-phase',

  propTypes: {
    schools:    R.PropTypes.array.isRequired,
    name:       R.PropTypes.string.isRequired,
    activeURNs: R.PropTypes.array.isRequired,
    expanded:   R.PropTypes.bool.isRequired
  },

  render: function() {
    var headerEl = D.h4(null, this.props.name);
    var schoolsEl = this.props.schools.map(function(schoolData) {
      return R.createElement(School, {
        name:                    schoolData.schoolName,
        distanceMetres:          schoolData.distanceMetres,
        overallEffectiveness:    schoolData.overallEffectiveness,
        qualityOfTeaching:       schoolData.qualityOfTeaching,
        leadershipAndManagement: schoolData.leadershipAndManagement,
        lastInspectionUrl:       schoolData.lastInspectionUrl
      });
    }, this);

    var args = [{ className: 'school-phase' }, headerEl];
    schoolsEl.forEach(function(el) {
      args.push(el);
    });

    return D.div.apply(this, args);
  }
});

module.exports = Phase;
