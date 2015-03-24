var R = require('react');
var Container = require('./criminality/container');

function CriminalityWidget(selector) {
  if (!(this instanceof CriminalityWidget)) {
    return new CriminalityWidget(selector);
  }
  this.selector = selector;
}

CriminalityWidget.prototype.render = function() {
  R.render(
    R.createElement(Container), document.querySelector(this.selector)
  );
};

module.exports = CriminalityWidget;
