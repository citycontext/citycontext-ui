var R = require('react');

function Widget(reactClass, selector, opts) {
  this.selector = selector;
  this.reactClass = reactClass;
  this.opts = opts || {};
}

Widget.prototype.render = function() {
  var element = R.createElement(this.reactClass, {
    displayForm: typeof this.opts.displayForm === 'undefined' ? true : this.opts.displayForm,
  });

  this.container = R.render(
    element, document.querySelector(this.selector)
  );

  return this;
};

Widget.prototype.queryByPostcode = function(postcode) {
  this.container.queryByPostcode(postcode);
};

module.exports = Widget;
