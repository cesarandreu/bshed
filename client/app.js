var ReactRouterPlugin = require('./plugins/react-router.js'),
  Routes = require('./components/Routes.jsx'),
  {HistoryLocation} = require('react-router'),
  Fluxible = require('fluxible');

var app = new Fluxible({
  appComponent: require('./components/Routes.jsx')
});

app.plug(ReactRouterPlugin({
  location: HistoryLocation,
  routes: Routes
}));

app.registerStore(require('./stores/ApplicationStore.js'));
app.registerStore(require('./stores/LayoutStore.js'));

module.exports = app;
