var React = require('react');

var {Link, State: StateMixin} = require('react-router');

var Home = React.createClass({
  mixins: [StateMixin],
  render: function () {
    return (
      <div className='home'>
        <header>
          <div className='title'>BIKESHED IT!</div>
          <div className='sub-title'>The premier bikeshedding platform.</div>
          <Link to='/'>HOME</Link>
          <Link to='/about'>ABOUT</Link>
        </header>
        <section> SECTION 1 </section>
        <section> SECTION 2 </section>
        <section> SECTION 3 </section>
      </div>
    );
  }
});

module.exports = Home;
