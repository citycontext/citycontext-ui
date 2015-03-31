var tape      = require('tape');
var R         = require('react/addons');
var testUtils = R.addons.TestUtils;
var Form      = require('../../../widgets/shared/form.js');
var Promise   = require('promise');

var formElement = R.createElement(Form, {
  onSubmit: function(input) {
    if (input === 'fail') {
      return Promise.reject('fail!');
    } else {
      return Promise.resolve(null);
    }
  }
});

var form = testUtils.renderIntoDocument(formElement);

tape('event on submit', function(t) {
  t.plan(1);

  var resSubmit;
  form.getDOMNode().addEventListener('citycontext-ui.submit', function(ev) {
    resSubmit = ev.detail.input;
  });

  var input = testUtils.findRenderedDOMComponentWithClass(form, 'input');
  input.getDOMNode().value = 'val';
  testUtils.Simulate.submit(form.getDOMNode());

  setTimeout(function() {
    t.equal(resSubmit, 'val', 'The event on submit should be sent');
  }, 200);
});

tape('event on success', function(t) {
  t.plan(1);

  var resSuccess;
  form.getDOMNode().addEventListener('citycontext-ui.success', function(ev) {
    resSuccess = ev.detail.input;
  });

  var input = testUtils.findRenderedDOMComponentWithClass(form, 'input');
  input.getDOMNode().value = 'val';
  testUtils.Simulate.submit(form.getDOMNode());

  setTimeout(function() {
    t.equal(resSuccess, 'val', 'The event on success should be sent');
  }, 200);
});

tape('event on failure', function(t) {
  t.plan(1);

  var err;
  form.getDOMNode().addEventListener('citycontext-ui.error', function(ev) {
    err = ev.detail.error;
  });

  var input = testUtils.findRenderedDOMComponentWithClass(form, 'input');
  input.getDOMNode().value = 'fail';
  testUtils.Simulate.submit(form.getDOMNode());

  setTimeout(function() {
    t.equal(err, 'fail!', 'The event on error should be sent');
  }, 200);
});
