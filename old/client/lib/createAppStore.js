/**
 * Create app store
 * @flow
 */
import { fetch, logger } from './middleware'
import { createStore, combineReducers, applyMiddleware } from 'redux'

export default function createAppStore (
  { fetcher, executeRequest, reducers, initialState }
) {
  const middleware = [fetch({ fetcher, executeRequest }), logger()]
  const finalCreateStore = applyMiddleware(...middleware)(createStore)
  const reducer = combineReducers(reducers)

  return finalCreateStore(reducer, initialState)
}
