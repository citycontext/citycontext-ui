var R       = require('react');
var Form    = require('../shared/form');
var Errors  = require('../shared/errors');
var client  = require('../../client');
var Promise = require('promise');

var ContainerMixin = {
  propTypes: {
    client: R.PropTypes.object
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

  query: function(val) {
    var self = this;
    self.setState({
      showErrors: false,
      showResults: false
    });

    return this.state.client.byPostcode(val)
      .then(function(data) {
        self.setState({
          showResults: true,
          data: data,
          error: null
        });
      }, function(error) {
        self.setState({
          showErrors: true,
          data: null,
          error: error
        });
        return Promise.reject(error);
      });
  },

  makeFormEl: function() {
    return R.createElement(Form, {
      onSubmit: this.query,
    });
  },

  makeErrorEl: function() {
    return R.createElement(Errors, {
      text: this.state.error,
      show: this.state.showErrors
    });
  },
};

module.exports = ContainerMixin;
