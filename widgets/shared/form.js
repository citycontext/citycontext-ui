var R = require('react');
var D = R.DOM;
var Promise = require('promise');

var statuses = {
  idle: 'idle',
  waiting: 'waiting'
};

var Form = R.createClass({
  displayName: 'form',
  propTypes: {
    // a callback that takes as argument the text input value
    onSubmit: R.PropTypes.func,
    onSubmitExternal:  R.PropTypes.func,
    onSuccessExternal: R.PropTypes.func,
    onErrorExternal:   R.PropTypes.func
  },

  getInitialState: function() {
    return {
      status: statuses.idle
    };
  },

  handleSubmit: function(ev) {
    ev.preventDefault();
    this.setState({ status: statuses.waiting });

    var input = this.refs.input.getDOMNode().value;

    var self = this;

    if (this.props.onSubmitExternal) {
      this.props.onSubmitExternal(input);
    }

    var promise = self.props.onSubmit(input);

    promise
      .then(function () {
        if (self.props.onSuccessExternal) {
          self.props.onSuccessExternal(input);
        }
      }, function(error) {
        if (self.props.onErrorExternal) {
          self.props.onErrorExternal(error);
        }
      })
      .then(function() {
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
