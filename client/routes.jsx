const React = require('react')
const {Route, RouteHandler, DefaultRoute, NotFoundRoute} = require('react-router')

// Application
const Application = require('./components/Application')
const About = require('./components/About')
const Home = require('./components/Home')
const NotFound = require('./components/NotFound')

// Bikesheds
const Bikeshed = require('./components/shared/Bikeshed')
const BikeshedInfo = require('./components/BikeshedInfo')
const BikeshedList = require('./components/BikeshedList')
const BikeshedRate = require('./components/BikeshedRate')

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
      >
        <DefaultRoute
          name='bikeshed-info'
          handler={BikeshedInfo}
        />
        <Route
          name='bikeshed-rate'
          handler={BikeshedRate}
          path='rate/?'
        />
      </Route>
    </Route>

    <NotFoundRoute
      handler={NotFound}
    />
  </Route>
)

module.exports = routes
