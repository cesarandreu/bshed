require('./Application.less')

import React from 'react'
const Navbar = require('./Navbar')
const Sidebar = require('./Sidebar')
const { RouteHandler } = require('react-router')

const Application = React.createClass({
  render () {
    return (
      <div className='layout'>
        <Navbar/>
        <Sidebar/>
        <div className='content'>
          <RouteHandler/>
        </div>
      </div>
    )
  }
})

module.exports = Application
