var R       = require('react');
var D       = R.DOM;
var Form    = require('../shared/form');
var Errors  = require('../shared/errors');
var Results = require('./results');
var client  = require('../../client');
var Promise = require('promise');

var Container = R.createClass({
  displayName: 'criminality-container',

  propTypes: {
    onSubmitExternal:  R.PropTypes.func,
    onSuccessExternal: R.PropTypes.func,
    onErrorExternal:   R.PropTypes.func
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

  render: function() {
    return D.div({ className: 'criminality-widget-container', client: null },
      R.createElement(Form, {
        onSubmit: this.query,
        onSubmitExternal:  this.props.onSubmitExternal,
        onSuccessExternal: this.props.onSuccessExternal,
        onErrorExternal:   this.props.onErrorExternal
      }),

      R.createElement(Results, {
        show: this.state.showResults,
        data: this.state.data
      }),

      R.createElement(Errors, {
        text: this.state.error,
        show: this.state.showErrors
      })
    );
  }
});

module.exports = Container;
