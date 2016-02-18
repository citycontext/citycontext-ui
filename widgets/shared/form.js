var R = require('react');
var RDOM = require('react-dom');
var D = R.DOM;

var statuses = {
  idle: 'idle',
  waiting: 'waiting'
};

var Form = R.createClass({
  displayName: 'form',
  propTypes: {
    // a callback that takes as argument the text input value
    onSubmit: R.PropTypes.func,
  },

  getInitialState: function() {
    return {
      status: statuses.idle
    };
  },

  handleSubmit: function(ev) {
    ev.preventDefault();
    this.setState({ status: statuses.waiting });

    var input = this.refs.input.value;
    var promise = this.props.onSubmit(input);

    var self = this;
    promise.then(function() {
      self.setState({ status: statuses.idle });
    });
  },

  render: function() {
    var spinnerStyle = this.state.status === statuses.idle ? { display: 'none' } : {};

    return (
      D.form({ className: 'form', onSubmit: this.handleSubmit },
        D.div({ className: 'form-group' },
          D.input({ className: 'input', type: 'text', ref: 'input' }),
          D.button({ type: 'submit', className: 'button' }, 'Go')
        ),
        D.div({className: 'form-group'},
          D.div({ className: 'spinner', style: spinnerStyle }, 'Loading')
        )
      )
    );
  }
});

module.exports = Form;
