import { createNavigateAction } from '../../utils/ActionUtils'
import { navigateTo } from '../../actions/NavigateActions'
import { reduxRouteComponent } from 'redux-react-router'
import React, { Component, PropTypes } from 'react'
import { observableFromStore } from 'redux-rx'
import routes from '../../config/routes'
import { Router } from 'react-router'

export class ApplicationContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      reduxRouteComponent: reduxRouteComponent(props.store),
      state$: observableFromStore(props.store)
    }
  }

  componentWillMount () {
    const { state$ } = this.state
    const { store } = this.props

    const location$ = state$
      .map(state => state.router)
      .distinctUntilChanged(router => router.pathname)

    const navigateActions$ = location$
      .flatMap(location => getMatchingRoutes(routes, location))
      .map(routes =>
        routes.components
          .map(component => component.navigateAction)
          .filter(navigateAction => navigateAction)
      )
      .withLatestFrom(location$, (navigateActions, location) =>
        () => store.dispatch(createNavigateAction(location, navigateActions))
      )
      .do(executeNavigateAction => {
        executeNavigateAction().catch(() => {
          store.dispatch(navigateTo('/about'))
        })
      })

    const subscription = navigateActions$.subscribe()

    this.setState({
      navigateActions$,
      subscription
    })
  }

  componentWillUnmount () {
    this.state.subscription.dispose()
  }

  render () {
    const { reduxRouteComponent } = this.state
    const { history } = this.props

    return (
      <Router
        history={history}
        routes={{
          component: reduxRouteComponent,
          childRoutes: [routes]
        }}
      />
    )
  }
}

export default ApplicationContainer

// Helpers
function getMatchingRoutes (routes, location) {
  return new Promise((resolve, reject) => {
    Router.run(routes, location, (err, state) => {
      err ? reject(err) : resolve(state)
    })
  })
}
