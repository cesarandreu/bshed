var React = require('react'),
  {Route, DefaultRoute} = require('react-router'),
  BikeshedBase = require('./BikeshedBase.jsx'),
  BikeshedListContainer = require('./BikeshedListContainer.jsx'),
  Bikeshed = require('./Bikeshed.jsx')

module.exports = (
  <Route name='bikesheds' handler={BikeshedBase}>
    <DefaultRoute handler={BikeshedListContainer}/>
    <Route name='show' path=':bikeshedId' handler={Bikeshed}></Route>
  </Route>
)
