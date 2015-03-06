module.exports = function RequestPlugin ({request}={}) {
  return {
    name: 'RequestPlugin',
    plugContext
  }

  function plugContext (contextOptions) {
    request = contextOptions.request || request

    return {
      plugActionContext
    }

    function plugActionContext (actionContext) {
      actionContext.request = request
    }
  }
}
