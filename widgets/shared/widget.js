var R = require('react');
var RDom = require('react-dom');

function Widget(reactClass, selector, opts) {
  this.selector = selector;
  this.reactClass = reactClass;
  this.opts = opts || {};

  // Populated after the call to render()
  this.container = null;
}

Widget.prototype.render = function() {
  var node = document.querySelector(this.selector);
  var postcode = node.getAttribute('data-postcode');
  var latlon = node.getAttribute('data-latlon');
  if (postcode && latlon) {
    throw 'At most one of data-postcode and data-latlon attributes should be specify for the node ' + this.selector;
  }

  var props = {
    displayForm: typeof this.opts.displayForm === 'undefined' ? true : this.opts.displayForm,
  };

  if (postcode) { props.postcode = postcode; }
  if (latlon) { props.latlon = latlon; }

  var element = R.createElement(this.reactClass, props);

  this.container = RDom.render(element, node);

  return this;
};

Widget.prototype.queryByPostcode = function(postcode) {
  this.container.queryByPostcode(postcode);
};

Widget.prototype.queryByLatLon = function(latlon) {
  this.container.queryByLatLon(latlon);
};

module.exports = Widget;
