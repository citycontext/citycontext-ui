var tape      = require('tape');
var R         = require('react/addons');
var testUtils = R.addons.TestUtils;
var Form      = require('../../../widgets/shared/form.js');
var Promise   = require('promise');

var renderForm = function(onSubmit, onSuccess, onError) {
  var formElement = R.createElement(Form, {
    onSubmit: function() { return Promise.resolve(null); },
    onSubmitExternal: onSubmit,
    onSuccessExternal: onSuccess,
    onErrorExternal: onError
  });

  return testUtils.renderIntoDocument(formElement);
};

tape('hook on submit', function(t) {
  t.plan(1);

  var called = false;
  var form = renderForm(function() {
    called = true;
  });

  testUtils.Simulate.submit(form.getDOMNode());

  setTimeout(function() {
    t.assert(called, 'The hook on submit should be called');
  }, 200);
});

tape('hook on success', function(t) {
  t.plan(1);
  var res;

  var form = renderForm(null, function(val) {
    res = val;
  });

  var input = testUtils.findRenderedDOMComponentWithClass(form, 'input');
  input.getDOMNode().value = 'val';
  testUtils.Simulate.submit(form.getDOMNode());

  setTimeout(function() {
    t.equal(res, 'val', 'The hook on success should be called');
  }, 200);
});

tape('hook on failure', function(t) {
  t.plan(1);
  var err;

  var formElement = R.createElement(Form, {
    onSubmit: function () {
      return new Promise(function() {
        throw 'fail!';
      });
    },
    onErrorExternal: function(e) { err = e; }
  });
  var form = testUtils.renderIntoDocument(formElement);

  testUtils.Simulate.submit(form.getDOMNode());

  setTimeout(function() {
    t.equal(err, 'fail!', 'The hook on error should be called');
  }, 200);
});
