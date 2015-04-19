var React = require('react/addons'),
  PureRenderMixin = React.addons.PureRenderMixin

var NotFound = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    return (
      <h1>NOT FOUND</h1>
    )
  }
})

module.exports = NotFound
