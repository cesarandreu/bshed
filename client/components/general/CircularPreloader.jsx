var cn = require('classnames')
var React = require('react/addons')
var PureRenderMixin = React.addons.PureRenderMixin

var CircularPreloader = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string
  },

  render: function () {
    var {className, ...props} = this.props
    return <div className={cn('circular-preloader', className)} {...props}></div>
  }
})

module.exports = CircularPreloader
