const React = require('react')
const {Link} = require('react-router')
const PureRenderMixin = React.addons.PureRenderMixin

const About = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  render () {
    return (
      <div className='home'>
        <header>
          <div className='title'>ABOUT!</div>
          <Link to='/'>HOME</Link>
          <Link to='/about'>ABOUT</Link>
        </header>
      </div>
    )
  }
})

module.exports = About
