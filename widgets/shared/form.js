var jade     = require('jade');
var utils    = require('../../utils');
var fs       = require('fs');

var template = fs.readFileSync(__dirname + '/templates/form.jade', 'utf-8');
var html     = jade.compile(template)();

function Form(selector, onSubmit) {
  if (!(this instanceof Form)) return new Form(selector, onSubmit);
  this.element = document.querySelector(selector);

  this.fields   = utils.fromHTML(html);
  this.input    = utils.findInNodes(this.fields, '.input');
  this.spinner  = utils.findInNodes(this.fields, '.spinner');
  this.onSubmit = onSubmit;
}

Form.prototype.render = function() {
  this.fields.forEach(function(el) {
    this.element.appendChild(el);
  }, this);
  this.element.addEventListener('submit', function(ev) {
    ev.preventDefault();
    this.spinner.style.display = '';
    this.onSubmit(this.input.value);
    this.spinner.style.display = 'none';
  }.bind(this));
};

module.exports = Form;
