const React = require('react')
const {Route, RouteHandler, DefaultRoute, NotFoundRoute} = require('react-router')

// Application
const Application = require('./components/Application')
const About = require('./components/About')
const Home = require('./components/Home')
const NotFound = require('./components/NotFound')

// Bikesheds
const Bikeshed = require('./components/Bikeshed')
const BikeshedList = require('./components/BikeshedList')

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
        name='bikeshed'
        path=':bikeshedId/?'
        handler={Bikeshed}
      />
    </Route>

    <NotFoundRoute
      handler={NotFound}
    />
  </Route>
)

module.exports = routes
