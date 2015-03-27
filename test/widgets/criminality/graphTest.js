var tape      = require('tape');
var R         = require('react/addons');
var testUtils = R.addons.TestUtils;
var Graph     = require('../../../widgets/criminality/graph.js');

var crimeData = {
  '2015-10': 31,
  '2015-11': 20,
  '2012-8': 26
};
var graphElement = R.createElement(Graph, { crimeData: crimeData });
var graph = testUtils.renderIntoDocument(graphElement);

tape('getPointsBy', function(t) {
  t.plan(3);
  t.deepEqual(
    graph.getPointsBy('month'),
    [
      [ '2012', { 'Aug': 26 } ],
      [ '2015', {
        'Oct': 31,
        'Nov': 20,
      }]
    ],
    'get points by month');

  t.deepEqual(
    graph.getPointsBy('quarter'),
    [
      [ '2012', { 'Q3': 26 } ],
      [ '2015', { 'Q4': 51 } ]
    ],
    'get points by quarter');

  t.deepEqual(
    graph.getPointsBy('year'),
    [
      [ '2012', { 'Year': 26 } ],
      [ '2015', { 'Year': 51 } ]
    ],
    'get points by year');
});

tape('getDataBy', function(t) {
  t.plan(3);
  var nullArray = function(n) {
    var res = [];
    for (var i = 0; i < n; i ++) {
      res[i] = null;
    }
    return res;
  };

  var expData2012 = nullArray(12);
  expData2012[7] = 26;

  var expData2015 = nullArray(12);
  expData2015[9] = 31;
  expData2015[10] = 20;

  var data = graph.getDataBy('month');

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

tape('change graph period', function(t) {
  t.plan(2);

  t.equal(
    graph.state.period,
    'quarter',
    'The initial timeframe should be "quarter"'
  );

  var button = R.findDOMNode(graph.refs['period-month-button']);
  testUtils.Simulate.click(button);

  setTimeout(function() {
    t.equal(
      graph.state.period,
      'month',
      'The timeframe after clicking should be "month"'
    );},
    300
  );
});
