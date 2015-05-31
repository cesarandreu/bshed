require('./rectangle-button.less')
require('./raised-button.less')

const cn = require('classnames')
const React = require('react/addons')
const EnhancedButton = require('./EnhancedButton')
const PureRenderMixin = React.addons.PureRenderMixin

const RaisedButton = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string
  },

  render () {
    const {label, children, className, ...other} = this.props

    return (
      <EnhancedButton {...other} className={cn(className, 'raised-button', 'rectangle-button')}>
        {label ? <span className='button-label'>{label}</span> : children}
      </EnhancedButton>
    )
  }
})

module.exports = RaisedButton
