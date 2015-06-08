require('./Application.less')

const Navbar = require('./Navbar')
const Sidebar = require('./Sidebar')
const React = require('react/addons')
const {RouteHandler} = require('react-router')

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
