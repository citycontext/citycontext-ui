var R = require('react');
var Container = require('./demographics/container');

function DemographicsWidget(selector, opts) {
  var _opts = opts || {};
  if (!(this instanceof DemographicsWidget)) {
    return new DemographicsWidget(selector, opts);
  }
  this.selector          = selector;
  this.onSubmitExternal  = _opts.onSubmit;
  this.onSuccessExternal = _opts.onSuccess;
  this.onErrorExternal   = _opts.onError;
}

DemographicsWidget.prototype.render = function() {
  var container = R.createElement(Container, {
    onSubmitExternal:  this.onSubmitExternal,
    onSuccessExternal: this.onSuccessExternal,
    onErrorExternal:   this.onErrorExternal
  });

  R.render(
    container, document.querySelector(this.selector)
  );
};

module.exports = DemographicsWidget;
