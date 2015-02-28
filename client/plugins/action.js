var co = require('co'),
  debug = require('debug'),
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
      debug('Action returned error', err)
      throw err
    })
  }
}

function executeAction (action, payload={}, done) {
  debug(`Executing action ${action.name} with payload`, payload)

  var promise
  if (isGeneratorFunction(action)) {
    promise = co(action(this.getActionContext(), payload))
  } else {
    promise = new Promise((resolve, reject) => {
      action(this.getActionContext(), payload, (err, res) => err ? reject(err) : resolve(res))
    })
  }

  if (done)
    promise.then(result => done(null, result)).catch(err => done(err))

  return promise
}
