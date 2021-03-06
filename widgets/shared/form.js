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
    value: R.PropTypes.string
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

    function setIdle() {
      self.setState({ status: statuses.idle });
    }

    promise.then(setIdle).catch(setIdle);
  },

  render: function() {
    var spinnerStyle = this.state.status === statuses.idle ? { display: 'none' } : {};
    var inputProps = {
      className: 'input',
      type: 'text',
      ref: 'input',
    };

    if (this.props.value) {
      inputProps.defaultValue = this.props.value;
    }

    return (
      D.form({ className: 'form', onSubmit: this.handleSubmit },
        D.div({ className: 'form-group' },
          D.input(inputProps),
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
