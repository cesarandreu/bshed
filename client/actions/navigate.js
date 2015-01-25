module.exports = function navigate (actionContext, payload, done) {
  actionContext.dispatch('CHANGE_ROUTE', payload);
  done();
};
