import BikeshedBuilder from './BikeshedBuilder'
import Layout from './Layout'
import About from './About'
import Home from './Home'

export const BikeshedRoutes = {
  component: BikeshedBuilder,
  path: '/'
}

export const AboutRoutes = {
  component: About,
  path: '/about'
}

export const HomeRoutes = {
  component: Home,
  path: '/home'
}

export const routes = {
  component: Layout,
  childRoutes: [
    BikeshedRoutes,
    AboutRoutes,
    HomeRoutes
  ]
}

export default routes

// import React from 'react'
// import { Route } from 'react-router'

// import BikeshedBuilder from './BikeshedBuilder'
// import Layout from './Layout'
// import About from './About'
// import Home from './Home'

// const routes = (
//   <Route component={Layout}>
//     <Route path= '/' component={BikeshedBuilder}/>
//     <Route path='/about' component={About}/>
//     <Route path='/home' component={Home}/>
//   </Route>
// )

// export default routes
