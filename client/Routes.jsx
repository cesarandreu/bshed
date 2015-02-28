var React = require('react'),
  {Route, DefaultRoute, NotFoundRoute} = require('react-router')

var Routes = (
  <Route name='bshed' path='/' handler={require('./components/layout/Application.jsx')}>
    <DefaultRoute name='home' handler={require('./pages/home/Home.jsx')}/>
    <Route name='about' handler={require('./pages/about/About.jsx')}></Route>
    {require('./pages/bikesheds/routes.jsx')}
    <NotFoundRoute handler={require('./components/layout/NotFound.jsx')}/>
  </Route>
)

module.exports = Routes
