'use strict';

var React = require('react'),
  EnhancedButton = require('./EnhancedButton.jsx');

var AppBarUser = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    user: React.PropTypes.object
  },

  render: function () {
    var {user} = this.props;

    var component, props;
    if (user) {
      component = <div></div>;
    } else {
      props = {
        className: 'login',
        link: true
      };

      component = <EnhancedButton {...props}>Login</EnhancedButton>;
    }

    return <div className='app-bar-user'>{component}</div>;
  }
});

module.exports = AppBarUser;
