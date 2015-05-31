const Router = require('react-router')

/**
 * RouterPlugin
 */
module.exports = function RouterPlugin ({location}={}) {
  return {
    name: 'RouterPlugin',
    plugContext
  }

  function plugContext ({url, app}={}, context) {
    const router = context.router = Router.create({
      location: url || location,
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
