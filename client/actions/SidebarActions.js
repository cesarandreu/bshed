/**
 * Sidebar toggle
 */
exports.toggle = function toggle (context) {
  context.dispatch('SIDEBAR_TOGGLE')
}

/**
 * Sidebar close
 */
exports.close = function close (context) {
  context.dispatch('SIDEBAR_CLOSE')
}
