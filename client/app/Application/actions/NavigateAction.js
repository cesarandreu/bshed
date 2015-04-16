var co = require('co')

module.exports = co.wrap(navigate)

function* navigate (context, payload) {
  try {
    context.dispatch('NAVIGATE_START', payload)
    // do thing
    context.dispatch('NAVIGATE_SUCCESS', payload)
  } catch (err) {
    context.dispatch('NAVIGATE_ERROR', payload)
    throw err
  }
}
