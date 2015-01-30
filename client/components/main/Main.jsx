var React = require('react');

var Main = React.createClass({
  render: function () {
    return <main>{this.props.children}</main>;
  }
});

module.exports = Main;
