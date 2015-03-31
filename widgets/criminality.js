var R = require('react');
var Container = require('./criminality/container');

function CriminalityWidget(selector) {
  if (!(this instanceof CriminalityWidget)) {
    return new CriminalityWidget(selector);
  }
  this.selector = selector;
}

CriminalityWidget.prototype.render = function() {
  var container = R.createElement(Container);

  R.render(
    container, document.querySelector(this.selector)
  );
};

module.exports = CriminalityWidget;
