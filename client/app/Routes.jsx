var React = require('react')
var {Route, DefaultRoute, NotFoundRoute} = require('react-router')

var routes = (
  <Route name='bshed' path='/' handler={require('./application/components/Application.jsx')}>
    <DefaultRoute name='home' handler={require('./home/components/Home.jsx')}/>
    <Route name='about' handler={require('./application/components/About.jsx')}></Route>
    {require('./bikesheds/routes.jsx')}
    <NotFoundRoute handler={require('./application/components/NotFound.jsx')}/>
  </Route>
)

module.exports = routes
