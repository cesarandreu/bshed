var React = require('react'),
  {Link} = require('react-router');

var Home = React.createClass({
  render: function () {
    return (
      <div className='home'>
        <header>
          <div className='title'>BIKESHED IT!</div>
          <div className='sub-title'>The premier bikeshedding platform.</div>
          <Link to='/'>HOME</Link>
          <Link to='/about'>ABOUT</Link>
          <Link to='/bikesheds'>BIKESHEDS</Link>
          <Link to='/bikesheds/1'>BIKESHED 1</Link>
        </header>
        <section> SECTION 1 </section>
        <section> SECTION 2 </section>
        <section> SECTION 3 </section>
      </div>
    );
  }
});

module.exports = Home;
