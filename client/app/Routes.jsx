var React = require('react'),
  {Route, DefaultRoute, NotFoundRoute} = require('react-router')

var Routes = (
  <Route name='bshed' path='/' handler={require('./Application/components/Application.jsx')}>
    <DefaultRoute name='home' handler={require('./Home/components/Home.jsx')}/>
    <Route name='about' handler={require('./Application/components/About.jsx')}></Route>
    {require('./Bikesheds/routes.jsx')}
    <NotFoundRoute handler={require('./Application/components/NotFound.jsx')}/>
  </Route>
)

module.exports = Routes
