/**
 * All modules should be aggregated here
 */
import invariant from 'invariant'
import { combineReducers } from 'redux'

// Application modules
import Screen from './Screen'
import Snackbar from './Snackbar'

const MODULES = {
  Screen,
  Snackbar
}

// Reducers
export const reducers = getReducers(MODULES)
function getReducers (modules) {
  const reducers = Object.entries(modules).reduce((reducers, [name, module]) => {
    invariant(
      typeof module.reducer === 'function',
      `Module "${name} is missing reducer"`
    )
    return {
      ...reducers,
      [name]: module.reducer
    }
  }, {})
  return combineReducers(reducers)
}

// Sagas
export const sagas = getSagas(MODULES)
function getSagas (modules) {
  return Object.entries(modules).reduce((sagas, [name, module]) => {
    invariant(
      Array.isArray(module.sagas),
      `Module "${name}" is missing sagas`
    )
    return Array.isArray(module.sagas)
      ? [...sagas, ...module.sagas]
      : [...sagas]
  }, [])
}
