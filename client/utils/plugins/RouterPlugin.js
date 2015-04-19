var Router = require('react-router')

module.exports = function RouterPlugin ({location}={}) {
  return {
    name: 'RouterPlugin',
    plugContext
  }

  function plugContext ({url, app}={}) {
    var router = Router.create({
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
