import './Layout.less'

import React, { PropTypes } from 'react'
import AppBar from '../AppBar'
// import Drawer from '../Drawer'
// import Immutable from 'immutable'

const Layout = React.createClass({
  propTypes: {
    // currentRoute: PropTypes.instanceOf(Immutable.Map).isRequired,
    children: PropTypes.node
  },

  render () {
    const { children, ...other } = this.props
    // console.log('Layout other props', JSON.stringify(other))
    // console.log('other', Object.keys(other))

    return (
      <div className='layout'>
        <AppBar/>
        {/*
        <Drawer/>
        */}
        <main className='layout-main'>
          LAYOUT MAIN
          { children }
        </main>
      </div>
    )
  }
})

export default Layout
