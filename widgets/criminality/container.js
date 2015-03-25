var R       = require('react');
var D       = R.DOM;
var Form    = require('../shared/form');
var Errors  = require('../shared/errors');
var Results = require('./results');
var client  = require('../../client');

var Container = R.createClass({
  displayName: 'criminality-container',

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

    this.state.client.byPostcode(val)
      .then(function(data) {
        self.setState({
          showResults: true,
          data: data
        });
      })
      .catch(function(error) {
        self.setState({
          showErrors: true,
          error: error
        });
      });
  },

  render: function() {
    return D.div({ className: 'criminality-widget-container', client: null },
      R.createElement(Form, { onSubmit: this.query }),
      R.createElement(Results, { show: this.state.showResults, data: this.state.data }),
      R.createElement(Errors, { text: this.state.error, show: this.state.showErrors })
    );
  }
});

module.exports = Container;
