'use strict';

var React = require('react');

var Home = React.createClass({
  render: function () {
    return (
      <div className='home'>
        <header>
          <div className='title'>BIKESHED IT!</div>
          <div className='sub-title'>The premier bikeshedding platform.</div>
        </header>
        <section> SECTION 1 </section>
        <section> SECTION 2 </section>
        <section> SECTION 3 </section>
      </div>
    );
  }
});

module.exports = Home;
