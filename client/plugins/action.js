var co = require('co'),
  debug = require('debug'),
  log = debug('ActionPlugin'),
  isPromise = require('is-promise'),
  isGeneratorFunction = require('is-generator-function')

module.exports = function ActionPlugin () {
  return {
    name: 'ActionPlugin',
    plugContext
  }
}

function plugContext (opts, context) {
  context.executeAction = executeAction.bind(context)

  return {
    plugComponentContext,
    plugActionContext
  }

  function plugActionContext (actionContext) {
    actionContext.executeAction = context.executeAction
  }

  function plugComponentContext (componentContext) {
    componentContext.executeAction = componentContextAction
  }

  function componentContextAction (action, payload) {
    context.executeAction(action, payload).catch(err => {
      context.executeAction(context._app._componentActionHandler, {err}, () => {})
    })
  }
}

function executeAction (action, payload={}, done) {
  log(`Executing action ${action.displayName || action.name} with payload ${payload}`)

  var promise
  if (isGeneratorFunction(action)) {
    promise = co(action(this.getActionContext(), payload))
  } else {
    promise = new Promise((resolve, reject) => {
      var result = action(this.getActionContext(), payload, (e, r) => e ? reject(e) : resolve(r))
      if (isPromise(result)) {
        result.then(resolve, reject)
      } else if (action.length < 3) {
        resolve(result)
      }
    })
  }

  if (done)
    promise.then(result => done(null, result)).catch(err => done(err))

  return promise
}
