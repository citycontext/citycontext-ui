var R = require('react');
var D = R.DOM;
var Chart = require('chart.js');
var config = require('../../config');

(function mergeChartOptions() {
  for (var i in config.chartsOptions) {
    if (config.chartsOptions.hasOwnProperty(i)) {
      for (var j in config.chartsOptions[i]) {
        if (config.chartsOptions[i].hasOwnProperty(j)) {
          Chart.defaults[i][j] = config.chartsOptions[i][j];
        }
      }
    }
  }
})();


var Graph = R.createClass({
  propTypes: {
    crimeData: R.PropTypes.object
  },

  getInitialState: function() {
    return {
      graph: null
    };
  },

  getPoints: function() {
    var crimeData = this.props.crimeData;
    var ps = [];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (var k in crimeData) {
      if (crimeData.hasOwnProperty(k)) {
        var dateFragments = k.split('-');
        var year = parseInt(dateFragments[0]),
            month = parseInt(dateFragments[1]) - 1; // months go from 0 to 11

        ps.push([
          year * 100 + month,
          '' + months[month] + ' ' + (year - 2000),
          crimeData[k]
        ]);
      }
    }

    ps.sort(function(a, b) { return a[0] - b[0]; } );

    return ps.map(function(xs) { return xs.slice(1,3); });
  },

  getData: function() {
    var points = this.getPoints();
    var labels = points.map(function(p) { return p[0]; });
    var data = points.map(function(p) { return p[1]; });

    return {
      labels: labels,
      datasets: [
        {
          label: 'Total number of crimes',
          data: data
        }
      ]
    };

  },

  displayName: 'criminality-graph',

  updateGraph: function() {
    if (!this.props.crimeData) { return; }

    this.state.graph.Line(this.getData());
  },

  componentDidMount: function() {
    var canvas = this.refs.graph.getDOMNode();

    if (!canvas.getContext) {
      console.warn('canvas not supported');
      return;
    }

    canvas.width = this.getDOMNode().offsetWidth;
    canvas.height = this.getDOMNode().offsetHeight;

    var ctx = canvas.getContext('2d');
    this.state.graph = new Chart(ctx);
    this.updateGraph();
  },

  componentDidUpdate: function() {
    this.updateGraph();
  },

  render: function() {
    if (!this.props.crimeData) {
      return D.div();
    }
    return D.div({ className: 'criminality-graph-container' },
      D.canvas({ className: 'criminality-graph', ref: 'graph' })
    );
  }
});

module.exports = Graph;
