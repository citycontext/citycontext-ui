var R = require('react');
var D = R.DOM;

var Description = R.createClass({
  displayName: 'flood-description',
  propTypes: {
    floodData: R.PropTypes.object
  },

  render: function() {
    return D.div(
      D.h4(null, this.props.floodData.riskCategory + 'flood risk'),
      D.p(null, 'Published on ' + this.props.floodData.dataPublishedOn)
    );
  }
});

module.exports = Description;
