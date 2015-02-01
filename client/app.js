var RouterPlugin = require('./plugins/router.js'),
  Fluxible = require('fluxible');

var app = new Fluxible({
  appComponent: require('./components/Routes.jsx')
});

app.plug(RouterPlugin({
  location: require('react-router').HistoryLocation
}));

app.registerStore(require('./stores/ApplicationStore.js'));
app.registerStore(require('./stores/LayoutStore.js'));

module.exports = app;
