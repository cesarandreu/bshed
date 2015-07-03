import React from 'react'
import { Route } from 'react-router'

import Layout from './Layout'
import About from './About'
import Home from './Home'

const routes = (
  <Route path= '/' component={Layout}>
    <Route path='about' component={About}/>
    <Route path='home' component={Home}/>
  </Route>
)

export default routes
