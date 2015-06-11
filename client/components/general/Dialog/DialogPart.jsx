require('./DialogPart.less')

const React = require('react')
const cn = require('classnames')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const DialogPart = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

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
