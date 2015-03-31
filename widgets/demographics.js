var R = require('react');
var Container = require('./demographics/container');

function DemographicsWidget(selector) {
  if (!(this instanceof DemographicsWidget)) {
    return new DemographicsWidget(selector);
  }
  this.selector = selector;
}

DemographicsWidget.prototype.render = function() {
  var container = R.createElement(Container);

  R.render(
    container, document.querySelector(this.selector)
  );
};

module.exports = DemographicsWidget;
