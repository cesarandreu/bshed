var React = require('react'),
  {Route, DefaultRoute} = require('react-router'),
  Application = require('./Application.jsx'),
  About = require('./About.jsx'),
  Home = require('./Home.jsx');

var routes = (
  <Route name='bshed' path='/' handler={Application}>
    <Route name='about' handler={About}></Route>
    <DefaultRoute name='home' handler={Home}/>
  </Route>
);

module.exports = routes;
