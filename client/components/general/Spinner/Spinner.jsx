require('./spinner.less')

const React = require('react')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const Spinner = React.createClass({
  mixins: [
    ImmutableRenderMixin
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
