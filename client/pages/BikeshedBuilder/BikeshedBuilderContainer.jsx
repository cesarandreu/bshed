import Rx from 'rx'
import React from 'react'
import { bindActionCreators } from 'redux-rx'
import BikeshedBuilder from './BikeshedBuilder'
import { createConnector } from 'redux-rx/react'
import { transitionTo } from 'redux-react-router'
import * as BikeshedBuilderActions from '../../actions/BikeshedBuilderActions'

var observer = Rx.Observer.create(
  function (x) {
    console.log('Next: ' + x)
  },
  function (err) {
    console.log('Error: ' + err)
  },
  function () {
    console.log('Completed')
  }
)

export default createConnector((props$, state$, dispatch$) => {
  const bikeshedBuilder$ = state$.map(state => state.bikeshedBuilder)
  const actionCreators$ = bindActionCreators(BikeshedBuilderActions, dispatch$)
  const transitionTo$ = bindActionCreators({ transitionTo }, dispatch$).map(ac => ac.transitionTo)
  const reset$ = actionCreators$.map(ac => ac.reset)

  // Detect navigation to and from bikeshed builder and create reset action
  const bikeshedBuilderNavigation$ = state$
    .distinctUntilChanged(state => state.router.pathname === '/')
    .withLatestFrom(reset$, (state, reset) => () => reset())
    .do(go => go())

  bikeshedBuilder$.subscribe(observer)

  const createdBikeshed$ = bikeshedBuilder$
    .map(bikeshedBuilder => bikeshedBuilder.get('createdBikeshed'))
    .distinctUntilChanged(createdBikeshed => createdBikeshed)
    .filter(createdBikeshed => createdBikeshed)

  createdBikeshed$.subscribe(observer)

  const transitionToNewBikeshed$ = createdBikeshed$
    .withLatestFrom(transitionTo$, (createdBikeshed, transitionTo) =>
      // () => transitionTo(`/bikesheds/${createdBikeshed}`)
      () => transitionTo(`/about`)
    )
    .do(go => go())

  transitionToNewBikeshed$.subscribe(observer)

  return Rx.Observable.combineLatest(
    bikeshedBuilder$,
    actionCreators$,
    bikeshedBuilderNavigation$,
    // transitionToNewBikeshed$,
    // bikeshedBuilderNavigation$,
    // bikeshedBuilderSuccess$,
    (bikeshedBuilder, actionCreators) => {
      return {
        ...actionCreators,
        ...{ bikeshedBuilder }
      }
    }
  )
}, props => {
  return <BikeshedBuilder { ...props }/>
})
