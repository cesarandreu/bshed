'use strict';

var React = require('react'),
  IconButton = require('./IconButton.jsx'),
  LayoutAction = require('../actions/Layout');

var Header = React.createClass({

  toggleMenu: function () {
    this.props.context.executeAction(LayoutAction.toggleMenu);
  },

  render: function () {

    return (
      <header>
        <IconButton icon='md-menu' className='menu' onTouchTap={this.toggleMenu}/>
        <div className='inner'>
          <div className='title'>{'TITLE'}</div>
          <div className='user'>{'LOGIN OR REGISTER'}</div>
        </div>
      </header>
    );
  }
});

module.exports = Header;
