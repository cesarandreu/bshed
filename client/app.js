var Fluxible = require('fluxible');

var app = new Fluxible({
  appComponent: require('./components/Routes.jsx')
});

// var ReactRouterPlugin = require('./plugins/react-router.js');
// app.plug(ReactRouterPlugin());

app.registerStore(require('./stores/ApplicationStore.js'));
app.registerStore(require('./stores/LayoutStore.js'));

module.exports = app;
