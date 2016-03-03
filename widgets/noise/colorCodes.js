var config = require('../../config');
var R = require('react');
var D = R.DOM;
var config = require('../../config');

var ColorCodes = R.createClass({
  displayName: 'noise-colors',

  render: function() {

    var colorCodes = Object.keys(config.noiseColors).map(function (dBRange) {
      return D.li(null,
        D.span({ className: 'color-' + dBRange }, null),
        D.span(null, dBRange));
    });

    return D.ul(null, colorCodes);
  }
});

module.exports = ColorCodes;;
