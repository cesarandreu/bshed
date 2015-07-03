/**
 * router
 * Called after router has run
 * Will notify that navigation started, and if it fails or succeeds
 * @param {Object} state React-router state
 */
exports.router = async function router (context, state) {
  try {
    context.dispatch('NAVIGATE_START', state)

    await Promise.all(
      state.routes
        .filter(route =>
          route.handler.navigateAction
        )
        .map(route =>
          context.executeAction(route.handler.navigateAction, state)
        )
    )

    context.dispatch('NAVIGATE_SUCCESS', state)
  } catch (err) {
    context.dispatch('NAVIGATE_FAIL', state)
    throw err
  }
}
