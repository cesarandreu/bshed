import './Application.less'

import React from 'react'
import AppBar from '../AppBar'
import Drawer from '../Drawer'
import Immutable from 'immutable'
import { handleHistory } from 'fluxible-router'
import { provideContext } from 'fluxible/addons'

let Application = React.createClass({
  propTypes: {
    currentRoute: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const { currentRoute } = this.props
    const Handler = currentRoute.get('handler')

    return (
      <div className='application'>
        <AppBar/>
        <Drawer/>
        <main className='application-main'>
          <Handler
            currentRoute={currentRoute}
          />
        </main>
      </div>
    )
  }
})

Application = handleHistory(Application)

Application = provideContext(Application)

export default Application
