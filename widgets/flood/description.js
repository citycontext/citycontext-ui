var R = require('react');
var DataTable = require('../dataTable');
var D = R.DOM;

var Description = R.createClass({
  displayName: 'flood-description',
  propTypes: {
    floodData: R.PropTypes.object,
    isAtRisk: R.PropTypes.bool
  },

  render: function() {
    var fields = [
      ['dataPublishedOn', 'Data published'],
      ['likelihood.riskCategory', 'Risk category'],
      ['suitability.scale', 'Suitability scale']
    ];

    var floodData = this.props.floodData;

    if (this.props.isAtRisk) {
      var table = R.createElement(DataTable, { data: floodData, fields: fields });

      var note  = D.p(null, D.small(null, 'chance ' + floodData.likelihood.note));
      return D.div({ className: 'data-table col span_5_of_12'}, table, note);
    } else {
      return D.div(null,
        D.p(null, "This location does not seem to be at risk")
      );
    }
  }
});

module.exports = Description;
