var R = require('react');
var RDom = require('react-dom');

function Widget(reactClass, endpoint, selector, opts) {
  this.selector = selector;
  this.reactClass = reactClass;
  this.endpoint = endpoint;
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
    endpoint: this.endpoint,
    queryParams: this.opts.queryParams
  };

  if (postcode) { props.postcode = postcode; }
  if (latlon) { props.latlon = latlon; }

  var element = R.createElement(this.reactClass, props);

  this.container = RDom.render(element, node);

  return this;
};

Widget.prototype.queryByPostcode = function(postcode, endpoint) {
  this.container.queryByPostcode(postcode, endpoint);
};

Widget.prototype.queryByLatLon = function(latlon, endpoint) {
  this.container.queryByLatLon(latlon, endpoint);
};

module.exports = Widget;
