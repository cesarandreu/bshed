require('./bike-grid.less')

const React = require('react/addons')
const Immutable = require('immutable')
const PureRenderMixin = React.addons.PureRenderMixin

const BikeGrid = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    bikeshed: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    bikes: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    return (
      <div className='bike-grid'>
      </div>
    )
  }
})

module.exports = BikeGrid
