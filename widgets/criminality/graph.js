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
      graph: null,
      chart: null,
      period: 'quarter'
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

  getLabelsBy: function(period) {
    if (period === 'month') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    } else if (period === 'quarter') {
      return ['Q1', 'Q2', 'Q3', 'Q4'];
    } else if (period === 'year') {
      return ['Year'];
    } else {
      throw 'Invalid timeframe in getLabelsBy. Valid ones are month and quarter';
    }
  },

  getPointsBy: function(period) {
    var crimeData = this.props.crimeData;

    var byYear = Object.keys(crimeData).reduce(function(acc, k) {
      if (crimeData.hasOwnProperty(k)) {
        var dateFragments = k.split('-');
        var year          = parseInt(dateFragments[0]);
        var monthNum      = parseInt(dateFragments[1]) - 1; // months go from 0 to 11
        acc[year] = acc[year] || {};

        if (period === 'month') {
          var month = this.getLabelsBy('month')[monthNum];
          acc[year][month] = crimeData[k];
        } else if (period === 'quarter') {
          var quarterNum = Math.floor(monthNum / 3) + 1;
          var quarter = 'Q' + quarterNum;
          acc[year][quarter] = (acc[year][quarter] || 0) + crimeData[k];
        } else if (period === 'year') {
          acc[year]['Year'] = (acc[year]['Year'] || 0) + crimeData[k];
        } else {
          throw 'Invalid timeframe in getPointsBy. Valid ones are month and quarter';
        }
        return acc;
      }
    }.bind(this), {});

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

  getDataBy: function(period) {
    var pointsByPeriod = this.getPointsBy(period);
    var labels = this.getLabelsBy(period);
    var datasets = pointsByPeriod.map(function(byYear, index) {
      var year     = byYear[0];
      var byPeriod = byYear[1];
      var colors   = this.toColors(config.criminalityGraph.barColorsRGBA[index]);

      var data = labels.reduce(function(acc, l) {
        acc.push(byPeriod[l] || null);
        return acc;
      }, []);

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
      labels: labels,
      datasets: datasets
    };
  },

  displayName: 'criminality-graph',

  updateGraph: function() {
    if (!this.props.crimeData) { return; }


    if (this.state.graph) {
      this.state.graph.destroy();
    }

    this.state.graph = this.state.chart.Bar(this.getDataBy(this.state.period));
  },


  componentDidMount: function() {
    var canvas = this.refs.graph.getDOMNode();
    canvas.width = this.getDOMNode().offsetWidth;
    canvas.height = this.getDOMNode().offsetHeight;

    var ctx = canvas.getContext('2d');
    this.state.chart = new Chart(ctx);

    if (!canvas.getContext) {
      console.warn('canvas not supported');
      return;
    }


    this.updateGraph();
  },

  componentDidUpdate: function() {
    this.updateGraph();
  },

  changePeriod: function(period) {
    return function() {
      this.setState({ period: period });
    }.bind(this);
  },

  render: function() {
    if (!this.props.crimeData) {
      return D.div();
    }

    var years = this.getPointsBy('year').map(function(x) { return x[0]; });
    var colors = [0, 1, 2].map(function(i) {
      return this.toColors(config.criminalityGraph.barColorsRGBA[i]).fillColor;
    }.bind(this));

    var legendItem = function(index) {
      if (years[index]) {
        return D.div({className: 'legend-item' },
          D.div({
            className: 'legend-color',
            style: { backgroundColor: colors[index] }
          }),
          D.span({ className: 'legend-text' }, years[index])
        );
      } else {
        return D.span({});
      }
    };

    var changePeriodButton = function(period) {
      var selected  = period === this.state.period;
      var className = selected ? 'selected button' : 'button';
      return D.button({
        onClick: this.changePeriod(period),
        className: className,
        ref: 'period-' + period + '-button'
      }, 'By ' + period);
    }.bind(this);

    return D.div({ className: 'criminality-graph-container' },
      D.div({ className: 'control' },
        changePeriodButton('month'),
        changePeriodButton('quarter'),
        changePeriodButton('year')
      ),
      D.section({ className: 'legend' },
        legendItem(0),
        legendItem(1),
        legendItem(2)
      ),
      D.canvas({ className: 'criminality-graph', ref: 'graph' })
    );
  }
});

module.exports = Graph;
