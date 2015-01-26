module.exports = function navigate (context, payload, done) {
  if (!context.router)
    return done(new Error('missing router'));

  context.dispatch('CHANGE_ROUTE', payload);
  done();
};
