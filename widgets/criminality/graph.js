var R = require('react');
var D = R.DOM;
var Rickshaw = require('rickshaw');

var graphColor  = '#409840';
var graphHeight = 400;

var toPoints = function toPoints(crimeData) {
  var points = [];

  for (var k in crimeData) {
    if (crimeData.hasOwnProperty(k)) {
      var dateFragments = k.split('-');
      var year = parseInt(dateFragments[0]),
        month = parseInt(dateFragments[1]) - 1; // months go from 0 to 11

      points.push({
        x: (Date.UTC(year, month) / 1000.0),
        y: crimeData[k]
      });
    }
  }

  points.sort(function(a, b) { return a.x - b.x; } );

  return points;
};

var Graph = R.createClass({
  displayName: 'criminality-graph',

  updateGraph: function() {
    if (!this.props.crimeData) { return; }
    var graphEl = R.findDOMNode(this.refs.graph);
    var yAxisEl = R.findDOMNode(this.refs.yAxis);
    var points  = toPoints(this.props.crimeData);

    graphEl.innerHTML = '';
    yAxisEl.innerHTML = '';

    var graph = new Rickshaw.Graph({
      element: graphEl,
      height: graphHeight,
      renderer: 'line',
      series: [
        {
          color: graphColor,
          data: points
        }
      ]
    });

    new Rickshaw.Graph.Axis.Time({ graph: graph });
    new Rickshaw.Graph.Axis.Y({
      graph: graph,
      orientation: 'left',
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      element: yAxisEl,
      color: 'white'
    });

    window.addEventListener('resize', function(){
      graph.configure({ width: this.getDOMNode().offsetWidth });
      graph.render();
    }.bind(this));

    graph.render();
  },

  propTypes: {
    crimeData: R.PropTypes.object
  },

  componentDidMount: function() {
    console.log('mounted');
    this.updateGraph();
  },

  componentDidUpdate: function() {
    console.log('updated');
    this.updateGraph();
  },

  render: function() {
    if (!this.props.crimeData) {
      return D.div();
    }
    return D.div({ className: 'criminality-graph-container' },
      D.div({ className: 'criminality-graph', ref: 'graph' }),
      D.div({ className: 'criminality-y-axis', ref: 'yAxis' })
    );
  }
});

module.exports = Graph;
