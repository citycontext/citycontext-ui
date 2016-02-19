var Widget = require('./shared/widget');
var Container = require('./transport/container');

TransportWidget.prototype = Object.create(Widget.prototype);
TransportWidget.prototype.constructor = TransportWidget;

function TransportWidget(selector, opts) {
  if (!(this instanceof TransportWidget)) {
    return new TransportWidget(selector, opts);
  }
  var newOpts = opts || {};
  newOpts.queryParams = {
    stopTypes: 'BCT,AIR,FTD,RSE,TMU,BCE,BCS,LCE',
    radius: 300
  };
  Widget.call(this, Container, 'transportStops', selector, newOpts);
}

module.exports = TransportWidget;
