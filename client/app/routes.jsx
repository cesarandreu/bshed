var React = require('react')
var {Route, DefaultRoute, NotFoundRoute} = require('react-router')

var routes = (
  <Route name='bshed' path='/' handler={require('./application/components/Application')}>
    <DefaultRoute name='home' handler={require('./home/components/Home')}/>
    <Route name='about' handler={require('./application/components/About')}></Route>
    {require('./bikesheds/routes')}
    <NotFoundRoute handler={require('./application/components/NotFound')}/>
  </Route>
)

module.exports = routes
