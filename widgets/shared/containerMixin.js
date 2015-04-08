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
      displayForm: typeof this.props.displayForm === 'undefined' ? true : this.props.displayForm,
      showResults: false,
      showErrors: false
    };
  },

  componentDidMount: function() {
    this.getDOMNode().classList.add('citycontext-ui');
  },

  queryByPostcode: function(postcode) {
    return this.queryHandler(function() {
      return this.state.client.byPostcode(postcode);
    }.bind(this));
  },

  queryHandler: function(query) {
    var self = this;
    self.setState({
      showErrors: false,
      showResults: false
    });

    return query()
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
    if (this.state.displayForm) {
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
