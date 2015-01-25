var React = require('react/addons'),
  cx = React.addons.classSet,
  _ = require('lodash');

var Icon = React.createClass({
  propTypes: {
    icon: React.PropTypes.string.isRequired
  },

  render: function () {
    var {className, icon, ...other} = this.props;
    var classes = cx({
      ['icon ' + icon]: true,
      [className]: className,
      md: _.contains(icon, 'md')
    });

    return <span {...other} className={classes}></span>;
  }
});

module.exports = Icon;
