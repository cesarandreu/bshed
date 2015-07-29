import React from 'react'
import { Observable } from 'rx'
import { bindActionCreators } from 'redux-rx'
import BikeshedBuilder from './BikeshedBuilder'
import { createConnector } from 'redux-rx/react'
import { transitionTo } from 'redux-react-router'
import BikeshedBuilderSelector from '../../selectors/BikeshedBuilderSelector'
import * as BikeshedBuilderActions from '../../actions/BikeshedBuilderActions'

const BikeshedBuilderContainer = createConnector((props$, state$, dispatch$) => {
  const actionCreators$ = bindActionCreators({ ...BikeshedBuilderActions }, dispatch$)
  const bikeshedBuilder$ = state$.map(BikeshedBuilderSelector)

  // Reset state on navigation
  // const navigateReset$ = state$
  //   .map(state => state.router.pathname)
  //   // .filter(pathname => pathname !== '/')
  //   .distinctUntilChanged(pathname => pathname)
  //   .withLatestFrom(dispatch$, (state, dispatch) =>
  //     () => dispatch(BikeshedBuilderActions.reset())
  //   )

  // Track bikeshed creation
  const bikeshedCreated$ = bikeshedBuilder$
    .map(bikeshedBuilder => bikeshedBuilder.get('createdBikeshed'))
    .distinctUntilChanged(createdBikeshed => createdBikeshed)
    .filter(createdBikeshed => createdBikeshed)
    .withLatestFrom(dispatch$, (createdBikeshed, dispatch) =>
      // () => transitionTo(`/bikesheds/${createdBikeshed}`)
      () => dispatch(transitionTo('/about'))
    )

  // const doAction$ = Observable.merge(navigateReset$, bikeshedCreated$)
  const doAction$ = Observable.merge(bikeshedCreated$)
    .do(go => go())
    .ignoreElements()

  const observable$ = Observable.combineLatest(
    bikeshedBuilder$,
    actionCreators$,
    (bikeshedBuilder, actionCreators) => {
      return {
        ...{ bikeshedBuilder },
        ...actionCreators
      }
    }
  )

  return Observable.merge(observable$, doAction$)

}, props =>
  <BikeshedBuilder { ...props }/>
)

BikeshedBuilderContainer.navigateTo = BikeshedBuilderActions.reset
BikeshedBuilderContainer.navigateFrom = BikeshedBuilderActions.reset

export default BikeshedBuilderContainer
