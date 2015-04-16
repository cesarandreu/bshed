var React = require('react'),
  {Route, DefaultRoute} = require('react-router'),
  BikeshedBase = require('./components/BikeshedBase.jsx'),
  BikeshedListContainer = require('./components/BikeshedListContainer.jsx'),
  Bikeshed = require('./components/Bikeshed.jsx')

module.exports = (
  <Route name='bikesheds' handler={BikeshedBase}>
    <DefaultRoute handler={BikeshedListContainer}/>
    <Route name='show' path=':bikeshedId' handler={Bikeshed}></Route>
  </Route>
)
