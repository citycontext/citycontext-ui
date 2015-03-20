var fs       = require('fs');
var Rickshaw = require('rickshaw');
var jade     = require('jade');
var Widget   = require('./widget');
var LSOAMap  = require('../lsoaMap');
var client   = require('../client');
var utils    = require('../utils');
var Form     = require('./shared/form');

var resultTemplate = fs.readFileSync(__dirname + '/templates/criminality-results.jade', 'utf-8');
var resultHTML     = jade.compile(resultTemplate)();
var resultContent  = utils.fromHTML(resultHTML);

CriminalityWidget.prototype   = new Widget();
CriminalityWidget.constructor = CriminalityWidget;
function CriminalityWidget(formEl, resultEl, errorEl, opts) {
  if (!(this instanceof CriminalityWidget)) {
    return new CriminalityWidget(formEl, resultEl, errorEl, opts);
  }

  Widget.call(this, formEl, resultEl, errorEl, opts);
}

CriminalityWidget.prototype.render = function() {
  var res = document.querySelector(this.resultEl);

  resultContent.forEach(function(el) {
    res.appendChild(el);
  });

  var header         = res.querySelector('.criminality-results-header');
  var graphContainer = res.querySelector('.criminality-graph-container');
  var graphEl        = res.querySelector('.criminality-graph');
  var yAxis          = res.querySelector('.criminality-y-axis');
  var mapEl          = res.querySelector('.criminality-map');
  var lsoaMap        = LSOAMap(mapEl);

  var graphColor     = this.opts.graphColor || '#409840';
  var graphHeight    = 400;

  var displayGraph = function displayGraph(crimeData) {
    var points = [];

    for (var k in crimeData) {
      if (crimeData.hasOwnProperty(k)) {
        var dateFragments = k.split("-");
        var year = parseInt(dateFragments[0]),
          month = parseInt(dateFragments[1]) - 1; // months go from 0 to 11

        points.push({
          x: (Date.UTC(year, month) / 1000.0),
          y: crimeData[k]
        });
      }
    }

    points.sort(function(a, b) { return a.x - b.x; } );

    var graph = new Rickshaw.Graph({
      element: graphEl,
      width: graphContainer.offsetWidth - 50,
      height: graphHeight,
      renderer: 'line',
      series: [
        {
          color: graphColor,
          data: points
        }
      ]
    });

    var x_axis = new Rickshaw.Graph.Axis.Time({ graph: graph }),
        y_axis = new Rickshaw.Graph.Axis.Y({
          graph: graph,
          orientation: 'left',
          tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
          element: yAxis,
          color: 'white'
        });

    window.addEventListener('resize', function(){
      graph.configure({ width: graphContainer.width });
      graph.render();
    });

    graph.render();
  };

  var onSuccess = function onSuccess(data) {
    var lsoa = data.lsoa;

    res.style.display = '';

    header.textContext = "Number of offences for " + lsoa.name + " LSOA";
    displayGraph(lsoa.crimes);
    lsoaMap.render(JSON.parse(lsoa.geometry));
  };

  var form = Form(this.formEl, function(val) {
    res.style.display = 'none';
    this.errMsg.style.display = 'none';
    graphEl.innerHTML = '';
    yAxis.innerHTML = '';

    client.withPostcodeEndpoint(val, "criminality", onSuccess, this.onError);
  }.bind(this));

  form.render();
};

module.exports = CriminalityWidget;
