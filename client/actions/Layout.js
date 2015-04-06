module.exports = {
  sidebar: {
    toggle: function (context) {
      context.dispatch('TOGGLE_SIDEBAR')
    },
    open: function (context) {
      context.dispatch('OPEN_SIDEBAR')
    },
    close: function (context) {
      context.dispatch('CLOSE_SIDEBAR')
    }
  }
}
