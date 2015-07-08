import React from 'react'
import { Route } from 'react-router'

import BikeshedBuilder from './BikeshedBuilder'
import Layout from './Layout'
import About from './About'
import Home from './Home'

const routes = (
  <Route component={Layout}>
    <Route path= '/' component={BikeshedBuilder}/>
    <Route path='/about' component={About}/>
    <Route path='/home' component={Home}/>
  </Route>
)

export default routes
