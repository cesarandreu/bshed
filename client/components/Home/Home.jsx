import React from 'react'
import { Link } from 'react-router'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const Home = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  render () {
    return (
      <div className='home'>
        <div className='title'>HOME!</div>
        <Link to='/'>ROOT</Link>
        <Link to='/home'>HOME</Link>
        <Link to='/about'>ABOUT</Link>
      </div>
    )
  }
})

module.exports = Home
