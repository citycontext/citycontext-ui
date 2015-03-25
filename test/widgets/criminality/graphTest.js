var tape      = require('tape');
var R         = require('react/addons');
var testUtils = R.addons.TestUtils;
var Graph     = require('../../../widgets/criminality/graph.js');

var crimeData = {
  '2015-1': 31,
  '2013-9': 22,
  '2012-8': 26
};
var graphElement = R.createElement(Graph, { crimeData: crimeData });
var graph = testUtils.renderIntoDocument(graphElement);

tape('getPoints', function(t) {
  t.plan(1);
  t.deepEqual(
    graph.getPoints(),
    [
      ['Aug 12', 26],
      ['Sep 13', 22],
      ['Jan 15', 31]
    ]
  );
});

tape('getData', function(t) {
  t.plan(1);
  t.deepEqual(
    graph.getData(),
    {
      labels: ['Aug 12', 'Sep 13', 'Jan 15'],
      datasets: [
        {
          label: 'Total number of crimes',
          data: [26, 22, 31]
        }
      ]
    }
  );
});
