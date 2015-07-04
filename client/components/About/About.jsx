import React from 'react'
import { Link } from 'react-router'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const About = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  render () {
    return (
      <div className='about'>
        <div className='title'>ABOUT!</div>
        <Link to='/'>ROOT</Link>
        <Link to='/home'>HOME</Link>
        <Link to='/about'>ABOUT</Link>
      </div>
    )
  }
})

module.exports = About
