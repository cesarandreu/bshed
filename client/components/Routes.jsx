var React = require('react'),
  {Route, DefaultRoute} = require('react-router'),
  Application = require('./Application.jsx'),
  Layout = require('./Layout.jsx'),
  About = require('./About.jsx'),
  Home = require('./Home.jsx');

var routes = (
  <Route name='bshed' path='/' handler={Application}>
    <Route handler={Layout}>
      <DefaultRoute name='home' handler={Home}/>
      <Route name='about' handler={About}></Route>
    </Route>
  </Route>
);

module.exports = routes;
