var co = require('co'),
  _ = require('lodash'),
  requests = require('../requests')

module.exports = co.wrap(navigate)

function* navigate (context, payload) {
  try {
    context.dispatch('NAVIGATE_START', payload)
    yield co(navigateRequests(context, payload))
    context.dispatch('NAVIGATE_SUCCESS', payload)
  } catch (err) {
    context.dispatch('NAVIGATE_ERROR', payload)
    throw err
  }
}

function* navigateRequests (context, payload) {
  var navigationRequests = payload.routes
  .filter(route => route.handler && route.handler.navigationData)
  .map(route => route.handler.navigationData(payload))
  .map(nr => {
    nr.req = requests[nr.storeName](context.request, nr)
    context.dispatch('NEW_NAVIGATION_REQUEST', nr.req)
    return nr
  })

  var responses = (yield navigationRequests.map(nr => nr.req)).map(res => ({res}))
  _.merge(navigationRequests, responses).forEach(nr => {
    context.dispatch('FINISHED_NAVIGATION_REQUEST', nr)
  })

  return navigationRequests
}
