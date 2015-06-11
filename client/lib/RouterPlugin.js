const Router = require('react-router')
const {HistoryLocation} = Router

/**
 * RouterPlugin
 */
module.exports = function RouterPlugin () {
  return {
    name: 'RouterPlugin',
    plugContext
  }

  function plugContext ({url, app}={}, context) {
    const router = context.router = Router.create({
      location: url || HistoryLocation,
      routes: app.getComponent()
    })

    return {
      plugActionContext
    }

    function plugActionContext (actionContext) {
      actionContext.router = router
    }
  }
}
