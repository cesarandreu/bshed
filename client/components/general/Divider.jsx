var cn = require('classnames')
var React = require('react/addons')
var PureRenderMixin = React.addons.PureRenderMixin

var Divider = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    var {className, ...props} = this.props
    return <hr className={cn('divider', className)} {...props}></hr>
  }
})

module.exports = Divider
