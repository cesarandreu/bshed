const React = require('react')
const {RouteHandler} = require('react-router')
const BikeshedActions = require('../../../actions/BikeshedActions')

const Bikeshed = React.createClass({
  statics: {
    navigateAction: BikeshedActions.infoNavigateAction
  },

  render () {
    return <RouteHandler/>
  }
})

module.exports = Bikeshed
