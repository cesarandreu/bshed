var React = require('react'),
  {Route, DefaultRoute} = require('react-router'),
  Application = require('./Application.jsx'),
  Home = require('./Home.jsx');

var routes = (
  <Route name='bshed' path='/' handler={Application}>
    <DefaultRoute name='home' handler={Home}/>
  </Route>
);

module.exports = routes;
