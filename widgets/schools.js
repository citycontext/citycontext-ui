var Widget = require('./shared/widget');
var Container = require('./schools/container');

SchoolsWidget.prototype = Object.create(Widget.prototype);
SchoolsWidget.prototype.constructor = SchoolsWidget;

function SchoolsWidget(selector, opts) {
  if (!(this instanceof SchoolsWidget)) {
    return new SchoolsWidget(selector, opts);
  }
  Widget.call(this, Container, 'schools', selector, opts);
}

module.exports = SchoolsWidget;
