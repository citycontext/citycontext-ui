var R = require('react');
var D = R.DOM;
var Types = R.PropTypes;
var MarkType = Types.oneOf([1,2,3,4]).isRequired;

var SchoolPerformance = R.createClass({
  displayName: 'school-performance',

  propTypes: {
    score: MarkType
  },

  render: function() {
    var emptyClass = 'circle empty-circle';
    var fullClass = 'circle full-circle';
    var score = this.props.score;

    // Ofsted scores go from 1 (best) to 4 (worst)
    // so we invert it so it's more intuitive
    return D.dd(null,
      D.div({ className: fullClass }),
      D.div({ className: score < 4 ? fullClass : emptyClass }),
      D.div({ className: score < 3 ? fullClass : emptyClass }),
      D.div({ className: score < 2 ? fullClass : emptyClass })
    );
  }
});

module.exports = SchoolPerformance;
