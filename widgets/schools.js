var R = require('react');
var Container = require('./schools/container');

function SchoolsWidget(selector) {
  if (!(this instanceof SchoolsWidget)) {
    return new SchoolsWidget(selector);
  }
  this.selector = selector;
}

SchoolsWidget.prototype.render = function() {
  var container = R.createElement(Container);

  R.render(
    container, document.querySelector(this.selector)
  );
};

module.exports = SchoolsWidget;
