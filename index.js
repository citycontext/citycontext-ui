require('./polyfills');
var DemographicsWidget = require('./widgets/demographics');
var CriminalityWidget  = require('./widgets/criminality');
var SchoolsWidget      = require('./widgets/schools');
var TransportWidget    = require('./widgets/transport');
var FloodWidget        = require('./widgets/flood');
var NoiseWidget        = require('./widgets/noise');
var config             = require('./config');

module.exports = {
  config: config,
  CriminalityWidget: CriminalityWidget,
  DemographicsWidget: DemographicsWidget,
  SchoolsWidget: SchoolsWidget,
  TransportWidget: TransportWidget,
  FloodWidget: FloodWidget,
  NoiseWidget: NoiseWidget
};
