var R = require('react');
var Container = require('./criminality/container');

function CriminalityWidget(selector, opts) {
  var _opts = opts || {};
  if (!(this instanceof CriminalityWidget)) {
    return new CriminalityWidget(selector, opts);
  }
  this.selector  = selector;
  this.onSubmitExternal  = _opts.onSubmit;
  this.onSuccessExternal = _opts.onSuccess;
  this.onErrorExternal   = _opts.onError;
}

CriminalityWidget.prototype.render = function() {
  var container = R.createElement(Container, {
    onSubmitExternal:  this.onSubmitExternal,
    onSuccessExternal: this.onSuccessExternal,
    onErrorExternal:   this.onErrorExternal
  });

  R.render(
    container, document.querySelector(this.selector)
  );
};

module.exports = CriminalityWidget;
