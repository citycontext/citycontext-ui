var Container = require('./flood/container');
var Widget = require('./shared/widget');

FloodWidget.prototype = Object.create(Widget.prototype);
FloodWidget.prototype.constructor = FloodWidget;

function FloodWidget(selector, opts) {
  if (!(this instanceof FloodWidget)) {
    return new FloodWidget(selector, opts);
  }
  Widget.call(this, Container, 'floodrisk', selector, opts);
}

module.exports = FloodWidget;
