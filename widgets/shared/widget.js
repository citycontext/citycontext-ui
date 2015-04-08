var R = require('react');

function Widget(reactClass, selector, opts) {
  this.selector = selector;
  this.reactClass = reactClass;
  this.opts = opts || {};
}

Widget.prototype.render = function() {
  var container = R.createElement(this.reactClass, {
    displayForm: this.opts.displayForm
  });

  R.render(
    container, document.querySelector(this.selector)
  );
};

module.exports = Widget;
