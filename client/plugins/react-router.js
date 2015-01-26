var Router = require('react-router');

module.exports = function ReactRouterPlugin (options={}) {
  var {location} = options;

  return {
    name: 'ReactRouterPlugin',
    plugContext (contextOptions={}) {
      var router = Router.create({
        location: contextOptions.path || contextOptions.location || location,
        routes: contextOptions.app.getAppComponent(),
      });
      return {
        plugActionContext (actionContext) {
          actionContext.router = router;
        },
        plugComponentContext (componentContext) {
          componentContext.transitionTo = router.transitionTo.bind(router);
          componentContext.router = router;
        }
      };
    }
  };
};
