var R = require('react');
var D = R.DOM;
var Types = R.PropTypes;
var MarkType = Types.oneOf([1,2,3,4]).isRequired;
var SchoolPerformance = require('./performance');

var School = R.createClass({
  displayName: 'school',

  propTypes: {
    name:                    Types.string.isRequired,
    distanceMetres:          Types.number.isRequired,
    overallEffectiveness:    MarkType,
    qualityOfTeaching:       MarkType,
    leadershipAndManagement: MarkType,
    lastInspectionUrl:       Types.string.isRequired,
    active:                  Types.bool.isRequired,
    urn:                     Types.number.isRequired
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

  handleClick: function(e) {
    e.preventDefault();
    var event = new CustomEvent(
      'citycontext-ui.activate-school',
      {
        detail: {
          urn: this.props.urn
        },
        bubbles: true
      }
    );

    this.getDOMNode().dispatchEvent(event);
  },

  render: function() {
    var bodyClass = this.props.active ? 'school-details-body expanded' : 'school-details-body';
    var caretClassName = this.props.active ? 'caret caret-expanded' : 'caret';

    return D.div({ className: 'school-details' },
      D.div({ className: 'school-details-heading' },
        D.h5(null,
          D.a({ href: '#', onClick: this.handleClick },
            D.span({ className: caretClassName }, '▶'),
            this.getShortName()
          ),
          D.span({ className: 'school-details-distance' }, this.getFormattedDistanceMiles())
        )
      ),
      D.div({ className: bodyClass },
        D.dl({ className: 'school-details-performance' },
          D.dt(null, 'Overall effectiveness'),
          R.createElement(SchoolPerformance, { score: this.props.overallEffectiveness }),
          D.dt(null, 'Quality of teaching'),
          R.createElement(SchoolPerformance, { score: this.props.qualityOfTeaching }),
          D.dt(null, 'Leadership'),
          R.createElement(SchoolPerformance, { score: this.props.leadershipAndManagement })
        ),
        D.p({ className: 'school-details-url' },
          D.a({ href: this.props.lastInspectionUrl, target: '_blank' }, 'Full Ofsted report')
        )
      )
    );
  }
});

module.exports = School;
