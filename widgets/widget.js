function Widget(formEl, resultEl, errorEl, opts) {
  this.formEl   = formEl;
  this.resultEl = resultEl;
  this.errorEl  = errorEl;
  this.opts     = opts || {};
  this.errMsg   = document.querySelector(this.errorEl);
  this.onError  =  function(errorMessage) {
    this.errMsg.style.display = '';
    this.errMsg.innerHTML = '<p class="error">' + errorMessage + '</p>';
  }.bind(this);
}

module.exports = Widget;
