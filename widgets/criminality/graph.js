var R = require('react');
var D = R.DOM;
var Chart = require('chart.js');
var config = require('../../config');
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

  toColors: function(rgba) {
    var template = 'rgba(' + rgba.join(',') + ',$opacity)';
    function color(opacity) {
      return template.replace('$opacity', opacity);
    }
    return {
      fillColor: color(0.5),
      strokeColor: color(0.8),
      highlightFill: color(0.75),
      highlightStroke: color(1)
    };
  },

  getPointsByYear: function() {
    var crimeData = this.props.crimeData;
    var byYear = {};

    for (var k in crimeData) {
      if (crimeData.hasOwnProperty(k)) {
        var dateFragments = k.split('-');
        var year          = parseInt(dateFragments[0]);
        var monthNum      = parseInt(dateFragments[1]) - 1; // months go from 0 to 11
        var month         = months[monthNum];

        byYear[year] = byYear[year] || {};
        byYear[year][month] = crimeData[k];
      }
    }

    var res = Object.keys(byYear).map(function(y) {
      if (byYear.hasOwnProperty(y)) {
        return ([y, byYear[y]]);
      }
    });

    res.sort(function(a, b) { return a[0] - b[0]; } );

    //keep only last three years
    if (res.length > 3) {
      return res.slice(res.length - 3, res.length);
    } else {
      return res;
    }
  },

  getData: function() {
    var pointsByYear = this.getPointsByYear();
    var datasets = pointsByYear.map(function(byYear, index) {
      var year = byYear[0];
      var byMonth = byYear[1];
      var data = new Array(12);
      var colors = this.toColors(config.criminalityGraph.barColorsRGBA[index]);

      Object.keys(byMonth).forEach(function(m) {
        var i = months.indexOf(m);
        if (i > -1) {
          data[i] = byMonth[m];
        }
      });


      return {
        label: year,
        data: data,
        fillColor: colors.fillColor,
        strokeColor: colors.strokeColor,
        highlightFill: colors.highlightFill,
        highlightStroke: colors.highlightStroke
      };
    }, this);

    return {
      labels: months,
      datasets: datasets
    };
  },

  displayName: 'criminality-graph',

  updateGraph: function() {
    if (!this.props.crimeData) { return; }

    this.state.graph.Bar(this.getData());
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
