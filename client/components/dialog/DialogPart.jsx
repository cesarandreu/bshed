var cn = require('classnames')
var React = require('react/addons')
var PureRenderMixin = React.addons.PureRenderMixin

var DialogPart = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    type: React.PropTypes.oneOf(['header', 'body', 'footer']).isRequired,
    className: React.PropTypes.string
  },

  render: function () {
    return (
      <div className={cn(`dialog-${this.props.type}`, this.props.className)}>
        {this.props.children}
      </div>
    )
  }
})

module.exports = DialogPart
