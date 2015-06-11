const React = require('react')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const NotFound = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  render () {
    return (
      <h1>NOT FOUND</h1>
    )
  }
})

module.exports = NotFound
