require('./spinner.less')

const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const Spinner = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  render () {
    return (
      <svg className='spinner'>
        <circle
          className='spinner-dash'
          cx='50'
          cy='50'
          r='20'
          fill='none'
          strokeWidth='2'
          strokeMiterlimit='10'
        />
      </svg>
    )
  }
})

module.exports = Spinner
