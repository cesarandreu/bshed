/**
 * Create store
 * @flow
 */
import { fetch, logger } from '../lib/middleware'
import { createStore, combineReducers, applyMiddleware } from 'redux'

/**
 * @param {Object} config
 * @param {Fetcher} config.fetcher
 * @returns Redux store
 */
export default function createAppStore ({ fetcher, executeRequest, reducers, initialState }) {
  const middleware = [fetch({ fetcher, executeRequest }), logger()]
  const finalCreateStore = applyMiddleware(...middleware)(createStore)
  const reducer = combineReducers(reducers)

  return finalCreateStore(reducer, initialState)
}
