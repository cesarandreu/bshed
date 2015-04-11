var cn = require('classnames'),
  React = require('react/addons'),
  EnhancedButton = require('./EnhancedButton'),
  PureRenderMixin = React.addons.PureRenderMixin

var RaisedButton = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string
  },

  render: function () {
    var {label, children, className, ...other} = this.props

    return (
      <EnhancedButton {...other} className={cn(className, 'raised-button', 'rectangle-button')}>
        {label ? <span className='button-label'>{label}</span> : children}
      </EnhancedButton>
    )
  }
})

module.exports = RaisedButton
