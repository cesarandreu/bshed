module.exports = {
  toggleMenu: function (context) {
    context.dispatch('TOGGLE_MENU');
  },
  openMenu: function (context) {
    context.dispatch('OPEN_MENU');
  },
  closeMenu: function (context) {
    context.dispatch('CLOSE_MENU');
  }
};
