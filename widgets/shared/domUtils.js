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

function dataTable(data, fields) {
  var rows = fields.reduce(function(acc, fs) {
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

module.exports = {
  dataTable: dataTable
};
