require('./dialog-part.less')

const cn = require('classnames')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const DialogPart = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    type: React.PropTypes.oneOf(['header', 'body', 'footer']).isRequired,
    className: React.PropTypes.string
  },

  render () {
    return (
      <div className={cn(`dialog-${this.props.type}`, this.props.className)}>
        {this.props.children}
      </div>
    )
  }
})

module.exports = DialogPart
