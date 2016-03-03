var R = require('react');
var D = R.DOM;
var config = require('../../config');
var nt = config.noiseTypes;

var NoiseType = R.PropTypes.oneOf([
  nt.roadDay,
  nt.roadNight,
  nt.railDay,
  nt.railNight
]).isRequired;

var NoiseClass = R.PropTypes.oneOf(Object.keys(config.noiseColors)).isRequired;

var NoiseArea = R.createClass({
  displayName: 'noise-area',
  propTypes: {
    theKey: R.PropTypes.string,
    noiseType: NoiseType,
    noiseClass: NoiseClass,
    distance: R.PropTypes.number.isRequired
  },

  render: function() {
    var classNames = [
      'noise-type',
      this.props.NoiseType,
      this.props.noiseClass
    ].join(' ');

    var distance = (this.props.distance === 0) ? 0 : parseFloat(this.props.distance).toFixed(1);

    return D.div({key: this.props.theKey },
      D.dt({ className: classNames }, this.props.noiseClass + ' dB'),
      D.dd({ className: 'distance'}, distance  + 'm away')
    );
  }
});

module.exports = NoiseArea;
