var React = require('react'),
  {Route, DefaultRoute} = require('react-router'),
  Application = require('./layout/Application.jsx'),
  Layout = require('./layout/Layout.jsx'),
  About = require('./about/About.jsx'),
  Home = require('./home/Home.jsx');

var routes = (
  <Route name='bshed' path='/' handler={Application}>
    <Route handler={Layout}>
      <DefaultRoute name='home' handler={Home}/>
      <Route name='about' handler={About}></Route>
    </Route>
  </Route>
);

module.exports = routes;
