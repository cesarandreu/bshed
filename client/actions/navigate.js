var requestAction = require('./requests');
module.exports = function navigate (context, payload, done) {
  if (!context.router) {
    done(new Error('missing router'));
  } else if (!context.request) {
    done(new Error('missing request'));
  } else {
    context.dispatch('CHANGE_ROUTE_START', payload);
    context.executeAction(requestAction, payload, function finishRequests (err) {
      context.dispatch(err ? 'CHANGE_ROUTE_FAILURE' : 'CHANGE_ROUTE_SUCCESS', payload);
      done(err);
    });
  }
};
