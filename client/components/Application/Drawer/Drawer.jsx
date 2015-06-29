import React from 'react'
import Immutable from 'immutable'

const Drawer = React.createClass({
  propTypes: {
    drawer: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    // const { drawer } = this.props

    return (
      <div className='drawer'>
        DRAWER
      </div>
    )
  }
})

export default Drawer
