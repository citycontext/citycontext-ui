var R = require('react');
var D = R.DOM;

var Header = R.createClass({
  render: function() {
    return D.h3({ className: 'header' }, this.props.text);
  }
});

module.exports = Header;
