var cn = require('classnames')
var React = require('react/addons')
var PureRenderMixin = React.addons.PureRenderMixin

var CircularPreloader = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    secondary: React.PropTypes.bool,
    primary: React.PropTypes.bool
  },

  render: function () {
    var {className, primary, secondary, ...props} = this.props
    return (
      <div className={cn('circular-preloader', className, {primary, secondary})} {...props}/>
    )
  }
})

module.exports = CircularPreloader