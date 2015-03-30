var R = require('react');
var Container = require('./schools/container');

function SchoolsWidget(selector, opts) {
  var _opts = opts || {};
  if (!(this instanceof SchoolsWidget)) {
    return new SchoolsWidget(selector, opts);
  }
  this.selector          = selector;
  this.onSubmitExternal  = _opts.onSubmit;
  this.onSuccessExternal = _opts.onSuccess;
  this.onErrorExternal   = _opts.onError;
}

SchoolsWidget.prototype.render = function() {
  var container = R.createElement(Container, {
    onSubmitExternal:  this.onSubmitExternal,
    onSuccessExternal: this.onSuccessExternal,
    onErrorExternal:   this.onErrorExternal
  });

  R.render(
    container, document.querySelector(this.selector)
  );
};

module.exports = SchoolsWidget;
