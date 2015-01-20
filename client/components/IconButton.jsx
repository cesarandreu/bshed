'use strict';

var React = require('react/addons'),
  EnhancedButton = require('./EnhancedButton.jsx'),
  Icon = require('./Icon.jsx'),
  cx = React.addons.classSet;

var IconButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired
  },

  render: function () {

    var {icon, className, ...other} = this.props;

    var classes = cx({
      'icon-button': true,
      [className]: className
    });

    return (
      <EnhancedButton {...other} className={classes}>
        <Icon icon={icon}/>
      </EnhancedButton>
    );
  }
});

module.exports = IconButton;
