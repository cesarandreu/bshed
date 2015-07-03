// import './Application.less'

import { provideContext } from 'fluxible-addons-react'
import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import routes from '../routes.jsx'
// import AppBar from '../AppBar'
// import Drawer from '../Drawer'
// import Immutable from 'immutable'

let Application = React.createClass({
  propTypes: {
    // currentRoute: PropTypes.instanceOf(Immutable.Map).isRequired,
    // children: PropTypes.node.isRequired
  },

  render () {
    // const { children } = this.props
    return (
      <Router
        routes={routes}
        onUpdate={function (...args) {
          console.log('onUpdate', args)
        }}
        onError={() => console.log('onError')}
        onAbort={() => console.log('onAbort')}
        { ...this.props }
      />
    )
  }
})

Application = provideContext(Application)

export default Application
