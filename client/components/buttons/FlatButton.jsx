var cn = require('classnames'),
  React = require('react/addons'),
  EnhancedButton = require('./EnhancedButton'),
  PureRenderMixin = React.addons.PureRenderMixin

var FlatButton = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    var {label, children, className, ...other} = this.props

    return (
      <EnhancedButton {...other} className={cn(className, 'flat-button')}>
        {label ? <span className='button-label'>{label}</span> : children}
      </EnhancedButton>
    )
  }
})

module.exports = FlatButton
