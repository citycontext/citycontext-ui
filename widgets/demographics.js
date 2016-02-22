var Container = require('./demographics/container');
var Widget = require('./shared/widget');

DemographicsWidget.prototype = Object.create(Widget.prototype);
DemographicsWidget.prototype.constructor = DemographicsWidget;

function DemographicsWidget(selector, opts) {
  if (!(this instanceof DemographicsWidget)) {
    return new DemographicsWidget(selector, opts);
  }
  Widget.call(this, Container, 'people', selector, opts);
}

module.exports = DemographicsWidget;
