var Router = require('react-router');

module.exports = function ReactRouterPlugin (options={}) {
  var {routes, location} = options;

  return {
    name: 'ReactRouterPlugin',
    plugContext (contextOptions={}) {
      if (contextOptions.routes) routes = contextOptions.routes;
      if (contextOptions.location) location = contextOptions.location;
      if (contextOptions.path) location = contextOptions.path;
      var router = Router.create({routes, location});

      return {
        plugActionContext (actionContext) {
          actionContext.router = router;
        },
        plugComponentContext (componentContext) {
          componentContext.transitionTo = router.transitionTo.bind(router);
          componentContext.router = router;
        }
      };
    },

    getRoutes () {
      return routes;
    }
  };
};
