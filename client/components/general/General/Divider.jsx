const cn = require('classnames')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const Divider = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    const {className, ...props} = this.props
    return <hr className={cn('divider', className)} {...props}/>
  }
})

module.exports = Divider
