var Container = require('./criminality/container');
var Widget = require('./shared/widget');

CriminalityWidget.prototype = Object.create(Widget.prototype);
CriminalityWidget.prototype.constructor = CriminalityWidget;

function CriminalityWidget(selector, opts) {
  if (!(this instanceof CriminalityWidget)) {
    return new CriminalityWidget(selector, opts);
  }
  Widget.call(this, Container, 'criminality', selector, opts);
}

module.exports = CriminalityWidget;
