'use strict';

var React = require('react');

var Header = React.createClass({
  render: function () {



    return (
      <header>
        <button className='menu-icon'>{'OPEN MENU'}</button>
        <div className='inner'>
          <div className='title'>{'TITLE'}</div>
          <div className='user'>{'LOGIN OR REGISTER'}</div>
        </div>
      </header>
    );
  }
});

module.exports = Header;
