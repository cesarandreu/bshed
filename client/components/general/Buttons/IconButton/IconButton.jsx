require('./IconButton.less')

const React = require('react')
const cn = require('classnames')
const Icon = require('../../Icon')
const EnhancedButton = require('../EnhancedButton')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const IconButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    icon: React.PropTypes.string.isRequired
  },

  render () {
    const {icon, className, ...props} = this.props
    return (
      <EnhancedButton
        className={cn('icon-button', className)}
        {...props}
      >
        <Icon icon={icon}/>
      </EnhancedButton>
    )
  }
})

module.exports = IconButton
