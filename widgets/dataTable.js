var R = require('react');
var D = R.DOM;

function resolveKey(data, keys) {
  var k = keys[0];
  if (typeof data[k] === 'object' && keys.length > 1) {
    return resolveKey(data[k], keys.splice(1));
  } else {
    return data[k];
  }
}

var DataTable = R.createClass({
  displayName: 'data-table',

  propTypes: {
    fields: R.PropTypes.arrayOf(R.PropTypes.array),
    data: R.PropTypes.object
  },
  render: function() {
    var data = this.props.data;
    var rows = this.props.fields.reduce(function(acc, fs) {
      var key     = fs[0];
      var label   = fs[1];
      var value   = resolveKey(data, key.split('.'));
      var titleEl = D.td(null, label);
      var valueEl = D.td(null, value);
      var rowEl   = D.tr({key: key}, titleEl, valueEl);
      acc.push(rowEl);
      return acc;
    }, [null]);

    return D.table(null, D.tbody(null, rows));
  }
});

module.exports = DataTable;
