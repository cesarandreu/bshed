'use strict';

var React = require('react'),
  IconButton = require('./IconButton.jsx'),
  LayoutAction = require('../actions/Layout');

var AppBar = React.createClass({

  toggleMenu: function () {
    this.props.context.executeAction(LayoutAction.toggleMenu);
  },

  render: function () {
    return (
      <nav className='app-bar'>
        <IconButton icon='md-menu' className='menu' onTouchTap={this.toggleMenu}/>
        <div className='inner'>
          <div className='title'>Bikeshed it!</div>
          <div className='user'>Login or sign up</div>
        </div>
      </nav>
    );
  }
});

module.exports = AppBar;
