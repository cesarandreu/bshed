var React = require('react'),
  {Route, DefaultRoute} = require('react-router'),
  BikeshedBase = require('./components/BikeshedBase'),
  BikeshedListContainer = require('./components/BikeshedListContainer'),
  Bikeshed = require('./components/Bikeshed')

module.exports = (
  <Route name='bikesheds' handler={BikeshedBase}>
    <DefaultRoute handler={BikeshedListContainer}/>
    <Route name='show' path=':bikeshedId' handler={Bikeshed}></Route>
  </Route>
)
