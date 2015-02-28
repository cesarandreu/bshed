var React = require('react')

var {Link, State: StateMixin} = require('react-router')

var About = React.createClass({
  mixins: [StateMixin],
  render: function () {
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
