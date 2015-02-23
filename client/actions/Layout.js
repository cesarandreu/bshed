module.exports = {
  toggleMenu: function (context) {
    context.dispatch('TOGGLE_LAYOUT_MENU');
  },
  openMenu: function (context) {
    context.dispatch('OPEN_LAYOUT_MENU');
  },
  closeMenu: function (context) {
    context.dispatch('CLOSE_LAYOUT_MENU');
  }
};
