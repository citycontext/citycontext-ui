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
      ['riskCategory', 'Risk category'],
      ['suitability.note', 'Suitability']
    ];

    var floodData = this.props.floodData;

    if (this.props.isAtRisk) {
      // derive a new field from two of the existing ones
      floodData.riskCategory = floodData.likelihood.riskCategory + ': ' + floodData.likelihood.note;

      var table = R.createElement(DataTable, { data: floodData, fields: fields });
      return D.div({ className: 'data-table col span_5_of_12'}, table);
    } else {
      return D.div(null,
        D.p(null, "This location does not seem to be at risk")
      );
    }
  }
});

module.exports = Description;
