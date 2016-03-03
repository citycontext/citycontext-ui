var R = require('react');
var NoiseArea = require('./noiseArea');
var ColorCodes = require('./colorCodes');
var D = R.DOM;

var Description = R.createClass({
  displayName: 'noise-description',

  propTypes: {
    roadDay: R.PropTypes.object,
    roadNight: R.PropTypes.object,
    railDay: R.PropTypes.object,
    railNight: R.PropTypes.object
  },

  render: function() {
    var noiseTypes = [
      this.props.roadDay,
      this.props.roadNight,
      this.props.railDay,
      this.props.railNight
    ];

    var notNullProps = noiseTypes.filter(notNull).length > 0;
    var areas = [];
    var colorCodes = {};

    function notNull(v) { return v != null; }

    if (notNullProps) {
      areas = noiseTypes.filter(notNull).map(function (na, i) {
        return R.createElement(NoiseArea, {
          noiseType: na.noiseType,
          noiseClass: na.noiseClass,
          distance: na.distance,
          theKey: 'noisearea-' + i,
        });
      });

      return D.dl({ className: 'span_5_of_12'}, areas, R.createElement(ColorCodes, {}));
    } else {
      return D.div(null,
        D.p(null, "Cannot find noise information for this area")
      );
    }
  }
});

module.exports = Description;
