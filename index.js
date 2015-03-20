var DemographicsWidget = require('./widgets/demographics');
var CriminalityWidget  = require('./widgets/criminality');
var SchoolsWidget      = require('./widgets/schools');
var config             = require('./config');

module.exports = {
  config: config,
  DemographicsWidget: DemographicsWidget,
  CriminalityWidget: CriminalityWidget,
  SchoolsWidget: SchoolsWidget
};
