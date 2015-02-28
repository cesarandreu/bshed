var Router = require('react-router')

module.exports = function RouterPlugin ({location}={}) {
  return {
    name: 'RouterPlugin',
    plugContext
  }

  function plugContext (contextOptions) {
    var router = Router.create({
      location: contextOptions.url || contextOptions.location || location,
      routes: contextOptions.app.getAppComponent()
    })

    return {
      plugActionContext,
      plugComponentContext
    }

    function plugActionContext (actionContext) {
      actionContext.router = router
    }

    function plugComponentContext (componentContext) {
      componentContext.transitionTo = router.transitionTo.bind(router)
      componentContext.router = router
    }
  }
}
