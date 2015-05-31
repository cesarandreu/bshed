const React = require('react')
const {Route, RouteHandler, DefaultRoute, NotFoundRoute} = require('react-router')

// Application
const Application = require('./components/Application/Application')
const About = require('./components/About/About')
const Home = require('./components/Home/Home')
const NotFound = require('./components/NotFound/NotFound')

// Bikesheds
const BikeshedInfo = require('./components/Bikesheds/BikeshedInfo')
const BikeshedList = require('./components/Bikesheds/BikeshedList')

const routes = (
  <Route handler={Application}>
    <DefaultRoute
      name='home'
      handler={Home}
    />
    <Route
      name='about'
      path='about/?'
      handler={About}
    />

    <Route
      name='bikesheds'
      path='bikesheds/?'
      handler={RouteHandler}
    >
      <DefaultRoute
        name='bikeshed-list'
        handler={BikeshedList}
      />
      <Route
        name='bikeshed-info'
        path=':bikeshedId/?'
        handler={BikeshedInfo}
      />
    </Route>

    <NotFoundRoute
      handler={NotFound}
    />
  </Route>
)

module.exports = routes
