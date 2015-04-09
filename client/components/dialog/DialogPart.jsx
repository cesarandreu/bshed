var React = require('react/addons'),
  PureRenderMixin = React.addons.PureRenderMixin

var DialogPart = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    type: React.PropTypes.oneOf(['header', 'body', 'footer'])
  },

  render: function () {
    return (
      <div className={`dialog-${this.props.type}`}>
        {this.props.children}
      </div>
    )
  }
})

module.exports = DialogPart
