var R       = require('react');
var Form    = require('../shared/form');
var Errors  = require('../shared/errors');
var client  = require('../../client');
var Promise = require('promise');

var ContainerMixin = {
  propTypes: {
    client: R.PropTypes.object,
    displayForm: R.PropTypes.bool
  },

  getInitialState: function() {
    return {
      data: null,
      error: null,
      client: this.props.client || client,
      showResults: false,
      showErrors: false
    };
  },

  componentDidMount: function() {
    this.getDOMNode().classList.add('citycontext-ui');
  },

  queryByPostcode: function(postcode) {
    return this.queryHandler(function(postcode) {
      return this.state.client.byPostcode(postcode);
    }.bind(this), postcode);
  },

  queryHandler: function(queryFn, input) {
    var self = this;
    self.setState({
      showErrors: false,
      showResults: false
    });
    var submitEvent = new CustomEvent('citycontext-ui.submit', {
      detail: { input: input },
      bubbles: true
    });
    this.getDOMNode().dispatchEvent(submitEvent);

    return queryFn(input)
      .then(function(data) {
        var successEvent = new CustomEvent('citycontext-ui.success', {
          detail: { input: input },
          bubbles: true
        });
        self.getDOMNode().dispatchEvent(successEvent);
        self.setState({
          showResults: true,
          data: data,
          error: null
        });
      }, function(error) {
        var errorEvent = new CustomEvent('citycontext-ui.error', {
          detail: { input: input, error: error },
          bubbles: true
        });
        self.getDOMNode().dispatchEvent(errorEvent);
        self.setState({
          showErrors: true,
          data: null,
          error: error
        });
        return Promise.reject(error);
      });
  },

  makeFormEl: function() {
    if (this.props.displayForm) {
      return R.createElement(Form, {
        onSubmit: this.queryByPostcode,
      });
    } else {
      return R.DOM.div();
    }
  },

  makeErrorEl: function() {
    return R.createElement(Errors, {
      text: this.state.error,
      show: this.state.showErrors
    });
  },
};

module.exports = ContainerMixin;
