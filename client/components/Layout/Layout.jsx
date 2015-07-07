import './Layout.less'
import AppBar from '../AppBar'
import React, { PropTypes } from 'react'
// import Drawer from '../Drawer'
// import Immutable from 'immutable'

const Layout = React.createClass({
  propTypes: {
    // currentRoute: PropTypes.instanceOf(Immutable.Map).isRequired,
    children: PropTypes.node
  },

  render () {
    const { children, ...other } = this.props

    return (
      <div className='layout'>
        <AppBar/>
        {/*
        <Drawer/>
        */}
        <main className='layout-main'>
          {children}
        </main>
      </div>
    )
  }
})

export default Layout
