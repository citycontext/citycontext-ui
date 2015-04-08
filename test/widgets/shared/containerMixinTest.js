var tape           = require('tape');
var R              = require('react/addons');
var D              = R.DOM;
var testUtils      = R.addons.TestUtils;
var ContainerMixin = require('../../../widgets/shared/containerMixin.js');
var Form           = require('../../../widgets/shared/form.js');
var Errors         = require('../../../widgets/shared/errors.js');
var Promise        = require('promise');

var Results = R.createClass({
  render: function() {
    return D.div();
  }
});

var Container = R.createClass({
  mixins: [ContainerMixin],

  render: function() {
    return D.div({ className: 'demographics-widget-container' },
      this.makeFormEl(),

      R.createElement(Results, {
        show: this.state.showResults,
        data: this.state.data
      }),

      this.makeErrorEl()
    );
  }
});

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
  var containerElement = R.createElement(Container, { displayForm: true });
  var container = render(containerElement);

  t.plan(3);
  t.true(getForm(container), 'There should be a Form');

  t.equal(getResults(container).props.show, false, 'No results should be displayed');
  t.equal(getErrors(container).props.show, false, 'No results should be displayed');
});

tape('The form can be hidden with the displayForm option', function(t) {
  var containerElement = R.createElement(Container, { displayForm: false });
  var container = render(containerElement);

  t.plan(1);
  t.equal(
    testUtils.scryRenderedComponentsWithType(container, Form).length,
    0,
    'There should be no Form'
  );
});

tape('The results are shown on successful lookup', function(t) {
  t.plan(4);
  var successfulClient = {
    byPostcode: function() {
      return Promise.resolve({});
    }
  };
  var containerElement = R.createElement(Container, {
    displayForm: false,
    client: successfulClient
  });
  var container = render(containerElement);
  var resSubmit;
  var resSuccess;

  container.getDOMNode().addEventListener('citycontext-ui.submit', function(ev) {
    resSubmit = ev.detail.input;
  });

  container.getDOMNode().addEventListener('citycontext-ui.success', function(ev) {
    resSuccess = ev.detail.input;
  });

  container.queryByPostcode('postcode');

  setTimeout(function() {
    t.equal(getResults(container).props.show, true, 'Results should be visible');
    t.equal(getErrors(container).props.show, false, 'Errors should not be visible');
    t.equal(resSubmit, 'postcode', 'An event should be triggered on submit');
    t.equal(resSuccess, 'postcode', 'An event should be triggered on success');
  }, 200);
});

tape('The errors are shown on failed lookup', function(t) {
  t.plan(3);
  var failingClient = {
    byPostcode: function() {
      return Promise.reject('fail');
    }
  };
  var containerElement = R.createElement(Container, {
    displayForm: false,
    client: failingClient
  });
  var container = render(containerElement);
  var err;

  container.getDOMNode().addEventListener('citycontext-ui.error', function(ev) {
    err = {
      input: ev.detail.input,
      error: ev.detail.error
    };
  });

  container.queryByPostcode('postcode');

  setTimeout(function() {
    t.equal(getResults(container).props.show, false, 'Results should not be visible');
    t.equal(getErrors(container).props.show, true, 'Errors should be visible');
    t.deepEqual(err, { input: 'postcode', error: 'fail' }, 'An event should be triggered on error');
  }, 200);
});
