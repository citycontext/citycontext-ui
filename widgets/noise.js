var Container = require('./noise/container');
var Widget = require('./shared/widget');

NoiseWidget.prototype = Object.create(Widget.prototype);
NoiseWidget.prototype.constructor = NoiseWidget;

function NoiseWidget(selector, opts) {
  if (!(this instanceof NoiseWidget)) {
    return new NoiseWidget(selector, opts);
  }
  Widget.call(this, Container, 'noise', selector, opts);
}

module.exports = NoiseWidget;
