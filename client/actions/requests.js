var co = require('co');
module.exports = function navigateRequests (context, payload, done) {
  co(function* () {
    context.dispatch('START_NAVIGATION_REQUESTS');
    var navigationRequests = navigationDataRequests(payload)
    .map((navReq) => {
      var store = context.getStore(navReq.storeName);
      navReq.req = store.fetch(context.request, navReq);
      navReq.promise = navigationRequestPromise(navReq);
      context.dispatch('NEW_NAVIGATION_REQUEST', navReq.req);
      return navReq;
    })

    try {
      yield Promise.all(navigationRequests.map(navReq => navReq.promise))
      navigationRequests.forEach((navReq) => {
        context.dispatch('FINISHED_NAVIGATION_REQUEST', navReq);
      })
      context.dispatch('FINISHED_NAVIGATION_REQUESTS');
      done(null);
    } catch (err) {
      context.dispatch('FAILED_NAVIGATION_REQUESTS')
      done(err);
    }
  });
};

// set err and res to navReq on request end
// resolve or reject promise based on request
function navigationRequestPromise (navReq) {
  return new Promise((resolve, reject) => {
    navReq.req.end((err, res) => {
      navReq.err = err;
      navReq.res = res;
      err ? reject(err) : resolve(res);
    })
  });
}

// only handlers with navigationData
// passes query, params, pathname
// expect {query, params, pathname, storeName}
function navigationDataRequests ({query, params, pathname, routes}={}) {
  return routes
    .filter(route => route.handler && route.handler.navigationData)
    .map(route => route.handler.navigationData({query, params, pathname}))
}
