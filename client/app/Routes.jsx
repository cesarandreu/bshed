var React = require('react'),
  {Route, DefaultRoute, NotFoundRoute} = require('react-router')

var Routes = (
  <Route name='bshed' path='/' handler={require('./layout/Application.jsx')}>
    <DefaultRoute name='home' handler={require('./home/Home.jsx')}/>
    <Route name='about' handler={require('./about/About.jsx')}></Route>
    {require('./bikesheds/routes.jsx')}
    <NotFoundRoute handler={require('./layout/NotFound.jsx')}/>
  </Route>
)

module.exports = Routes
