const React = require('react')
const {Link} = require('react-router')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const About = React.createClass({
  mixins: [
    ImmutableRenderMixin
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
