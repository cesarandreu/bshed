// import './Application.less'

import navigateAction from '../../actions/navigateAction'
import { provideContext } from 'fluxible-addons-react'
import React, { PropTypes, Component } from 'react'
import { Router } from 'react-router'
import routes from '../routes'
// import AppBar from '../AppBar'
// import Drawer from '../Drawer'
// import Immutable from 'immutable'

@provideContext
class Application extends Component {
  // propTypes: {
  //   currentRoute: PropTypes.instanceOf(Immutable.Map).isRequired,
  //   children: PropTypes.node.isRequired
  // },

  render () {
    const { context } = this.props

    return (
      <Router
        routes={routes}
        onUpdate={function () {
          // Has the router's context, shh don't tell anyone
          const { branch, components, location, params } = this.state
          context.executeAction(navigateAction, { branch, components, location, params })
          // console.log('this.state', this.state)
        }}
        onError={() => console.log('onError')}
        onAbort={() => console.log('onAbort')}
        { ...this.props }
      />
    )
  }
}

export default Application
