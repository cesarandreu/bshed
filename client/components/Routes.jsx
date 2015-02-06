var React = require('react'),
  {Route, DefaultRoute} = require('react-router');

var routes = (
  <Route name='bshed' path='/' handler={require('./layout/Application.jsx')}>
    <DefaultRoute name='home' handler={require('./home/Home.jsx')}/>
    <Route name='about' handler={require('./about/About.jsx')}></Route>
    {require('./bikesheds/routes.jsx')}
  </Route>
);

module.exports = routes;
