var R = require('react');
var D = R.DOM;
var Types = R.PropTypes;
var MarkType = Types.oneOf([1,2,3,4]).isRequired;

var School = R.createClass({
  displayName: 'school',

  propType: {
    name: Types.string.isRequired,
    distanceMetres: Types.number.isRequired,
    overallEffectiveness: MarkType,
    qualityOfTeaching: MarkType,
    leadershipAndManagement: MarkType,
    lastInspectionUrl: Types.string.isRequired
  },

  getShortName: function() {
    var name = this.props.name;
    var maxLength = 30;

    if (name.length <= maxLength) {
      return name;
    }
    return name.substr(0, maxLength-3) + '…';
  },

  getFormattedDistanceMiles: function() {
    return (this.props.distanceMetres / 1609.344).toPrecision(2).toString() + ' miles';
  },


  render: function() {
    return D.div({ className: 'school-details' },
      D.div({ className: 'school-details-heading' },
        D.h5(null,
          D.a({ href: '#' }, this.getShortName()),
          D.p({ className: 'school-details-distance' }, this.getFormattedDistanceMiles())
        )
      ),
      D.div({ className: 'school-details-body' },
        D.dl({ className: 'school-details-performance' },
          D.dt(null, 'Overall effectiveness'),
          D.dd(null, this.props.overallEffectiveness),
          D.dt(null, 'Quality of teaching'),
          D.dd(null, this.props.qualityOfTeaching),
          D.dt(null, 'Leadership'),
          D.dd(null, this.props.leadershipAndManagement)
        ),
        D.p({ className: 'school-details-url' },
          D.a({ href: this.props.lastInspectionUrl }, 'Full Ofsted report')
        )
      )
    );
  }
});

module.exports = School;
