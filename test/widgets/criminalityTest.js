var tape      = require('tape');
var R         = require('react/addons');
var testUtils = R.addons.TestUtils;
var Container = require('../../widgets/criminality/container.js');
var Form      = require('../../widgets/shared/form.js');
var Errors    = require('../../widgets/shared/errors.js');
var Results   = require('../../widgets/criminality/results.js');
var Promise   = require('promise');

var getForm = function(container) {
  return testUtils.findRenderedComponentWithType(container, Form);
};

var getResults = function(container) {
  return testUtils.findRenderedComponentWithType(container, Results);
};

var getErrors = function(container) {
  return testUtils.findRenderedComponentWithType(container, Errors);
};

var render = function(element) {
  return testUtils.renderIntoDocument(element);
};

tape('Only the form is displayed on load', function(t) {
  var containerElement = R.createElement(Container);
  var container = render(containerElement);

  t.plan(3);
  t.true(getForm(container), 'There should be a Form');

  t.equal(getResults(container).props.show, false, 'No results should be displayed');
  t.equal(getErrors(container).props.show, false, 'No results should be displayed');
});

tape('The results are shown on successful lookup', function(t) {
  t.plan(2);
  var successfulClient = {
    byPostcode: function() {
      return Promise.resolve({});
    }
  };
  var containerElement = R.createElement(Container, { client: successfulClient });
  var container = render(containerElement);

  testUtils.Simulate.submit(getForm(container).getDOMNode());

  setTimeout(function() {
    t.equal(getResults(container).props.show, true, 'Results should be visible');
    t.equal(getErrors(container).props.show, false, 'Errors should not be visible');
  }, 200);
});

tape('The errors are shown on failed lookup', function(t) {
  t.plan(2);
  var failingClient = {
    byPostcode: function() {
      return Promise.reject({});
    }
  };
  var containerElement = R.createElement(Container, { client: failingClient });
  var container = render(containerElement);

  testUtils.Simulate.submit(getForm(container).getDOMNode());

  setTimeout(function() {
    t.equal(getResults(container).props.show, false, 'Results should not be visible');
    t.equal(getErrors(container).props.show, true, 'Errors should be visible');
  }, 200);
});
