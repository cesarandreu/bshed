require('./circular-preloader.less')

const cn = require('classnames')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const CircularPreloader = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    secondary: React.PropTypes.bool,
    primary: React.PropTypes.bool
  },

  render: function () {
    const {className, primary, secondary, ...props} = this.props
    return (
      <div className={cn('circular-preloader', className, {primary, secondary})} {...props}/>
    )
  }
})

module.exports = CircularPreloader
