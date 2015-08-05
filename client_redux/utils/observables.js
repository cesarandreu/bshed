import { Router } from 'react-router'
import { Observable } from 'rx'

/**
 * @param routes$ Route state observable
 * @returns $navigateToAction
 */
export function navigateTo (routes$) {
  return routes$
    .flatMap(routes => {
      return routes.components.reduce((actions, component) => {
        if (component.navigate) {
          actions.push(component.navigate)
        }
        if (component.navigateTo) {
          actions.push(component.navigateTo)
        }
        return actions
      }, [])
    })
}

/**
 * @param routes$ Route state observable
 * @returns navigateFromAction$
 */
export function navigateFrom (routes$) {
  return routes$
    .pairwise()
    .map(routesPair => routesPair[0])
    .flatMap(routes => {
      return routes.components.reduce((actions, component) => {
        if (component.navigate) {
          actions.push(component.navigate)
        }
        if (component.navigateFrom) {
          actions.push(component.navigateFrom)
        }
        return actions
      }, [])
    })
}

/**
 * Get router location from state
 * @returns location$
 */
export function locationStream (state$) {
  return state$
    .map(state => state.router)
    .distinctUntilChanged(router => router.pathname)
}

/**
 * Get route from router location and routes object
 * @returns route$
 */
export function routeStream (location$, routes) {
  return location$
    .flatMap(location => getMatchingRoutes(routes, location))
}

/**
 * Get navigate actions
 * @returns navigateAction$
 */
export function navigateActions (state$, routes) {
  const location$ = locationStream(state$)
  const routes$ = routeStream(location$, routes)

  return Observable.merge(
    navigateFrom(routes$),
    navigateTo(routes$)
  )
}

function getMatchingRoutes (routes, location) {
  return new Promise((resolve, reject) => {
    Router.run(routes, location, (err, state) => {
      err ? reject(err) : resolve(state)
    })
  })
}
