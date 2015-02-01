module.exports = function RequestPlugin (options={}) {
  var {request} = options;

  return {
    name: 'RequestPlugin',
    plugContext (contextOptions={}) {
      request = contextOptions.request || request;

      return {
        plugActionContext (actionContext) {
          actionContext.request = request;
        }
      };
    }
  };
};
