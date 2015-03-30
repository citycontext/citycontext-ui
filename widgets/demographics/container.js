var R = require('react');
var D = R.DOM;
var ContainerMixin = require('../shared/containerMixin');
var Results = require('./results');

var Container = R.createClass({
  displayName: 'demographics-container',
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

module.exports = Container;
