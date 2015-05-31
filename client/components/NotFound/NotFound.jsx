const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const NotFound = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  render () {
    return (
      <h1>NOT FOUND</h1>
    )
  }
})

module.exports = NotFound
