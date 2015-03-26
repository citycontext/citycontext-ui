var tape      = require('tape');
var R         = require('react/addons');
var testUtils = R.addons.TestUtils;
var Graph     = require('../../../widgets/criminality/graph.js');

var crimeData = {
  '2015-10': 31,
  '2015-2': 20,
  '2012-8': 26
};
var graphElement = R.createElement(Graph, { crimeData: crimeData });
var graph = testUtils.renderIntoDocument(graphElement);

tape('getPointsByYear', function(t) {
  t.plan(1);
  t.deepEqual(
    graph.getPointsByYear(),
    [
      [ '2012', { 'Aug': 26 } ],
      [ '2015', {
        'Feb': 20,
        'Oct': 31
      }]
    ]
  );
});

tape('getData', function(t) {
  t.plan(3);
  var expData2012 = new Array(12);
  expData2012[7] = 26;

  var expData2015 = new Array(12);
  expData2015[1] = 20;
  expData2015[9] = 31;

  var data = graph.getData();

  t.deepEqual(
    data.labels,
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  );

  t.deepEqual(data.datasets[0].data, expData2012);
  t.deepEqual(data.datasets[1].data, expData2015);
});

tape('toColors', function(t) {
  t.plan(1);

  t.deepEqual(
    graph.toColors([1,2,3]),
    {
      fillColor:       'rgba(1,2,3,0.5)',
      strokeColor:     'rgba(1,2,3,0.8)',
      highlightFill:   'rgba(1,2,3,0.75)',
      highlightStroke: 'rgba(1,2,3,1)'
    }
  );
});
