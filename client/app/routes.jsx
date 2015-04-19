var React = require('react')
var {Route, DefaultRoute, NotFoundRoute} = require('react-router')

var routes = (
  <Route name='bshed' path='/' handler={require('./Application/components/Application')}>
    <DefaultRoute name='home' handler={require('./Home/components/Home')}/>
    <Route name='about' handler={require('./Application/components/About')}></Route>
    {require('./Bikesheds/routes')}
    <NotFoundRoute handler={require('./Application/components/NotFound')}/>
  </Route>
)

module.exports = routes
