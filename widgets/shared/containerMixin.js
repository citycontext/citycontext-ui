var R       = require('react');
var RDOM    = require('react-dom');
var Form    = require('../shared/form');
var Errors  = require('../shared/errors');
var client  = require('../../client');
var Promise = require('promise');
var Types   = R.PropTypes;

var ContainerMixin = {
  propTypes: {
    client: Types.object,
    displayForm: Types.bool,
    postcode: Types.string,
    latlon: Types.string,
    endpoint: Types.string,
    queryParams: Types.object
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
    RDOM.findDOMNode(this).classList.add('citycontext-ui');
    if (this.props.postcode) {
      this.queryByPostcode(this.props.postcode);
    }

    if (this.props.latlon) {
      this.queryByLatLon(this.props.latlon);
    }
  },

  queryByPostcode: function(postcode) {
    return this.queryHandler(function(postcode) {
      return this.state.client.byPostcode(postcode, this.props.endpoint, this.props.queryParams);
    }.bind(this), postcode);
  },

  queryByLatLon: function(latlon) {
    return this.queryHandler(function(latlon) {
      return this.state.client.byLatLon(latlon, this.props.endpoint, this.props.queryParams);
    }.bind(this), latlon);
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
    RDOM.findDOMNode(this).dispatchEvent(submitEvent);

    return queryFn(input)
      .then(function(data) {
        var successEvent = new CustomEvent('citycontext-ui.success', {
          detail: { input: input },
          bubbles: true
        });
        RDOM.findDOMNode(self).dispatchEvent(successEvent);
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
        RDOM.findDOMNode(self).dispatchEvent(errorEvent);
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
