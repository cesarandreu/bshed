// ORIGINAL SOURCE: https://github.com/yahoo/fluxible-immutable-utils
import { createStore } from 'fluxible/addons'
import Immutable from 'immutable'

function initialize () {
  this._state = Immutable.Map()
}

function rehydrate (state) {
  this._state = Immutable.fromJS(state)
}

function dehydrate () {
  return this._state
}

function getState () {
  return this._state
}

function setState (newState) {
  newState = Immutable.fromJS(newState)

  const isEqual = this._state.equals(newState)
  if (!isEqual) {
    this._state = newState
    this.emitChange(this._state)
  }
  return isEqual
}

function mergeState (stateFragment) {
  return this.setState(this._state.merge(stateFragment))
}

/**
 * Helper for creating an immutable store class
 *
 * @method createImmutableStore
 * @param {Object} spec of the created Store class
 * @param {String} spec.storeName The name of the store
 * @param {Object} spec.handlers Hash of action name to method name of action handlers
 * @param {Function} [spec.initialize] Function called during construction for setting the default `_state` (optional).
 * @return {Store} Store class
 **/
module.exports = function createImmutableStore (spec) {
  return createStore(Object.assign({
    initialize: initialize,
    rehydrate: rehydrate,
    dehydrate: dehydrate,
    setState: setState,
    getState: getState,
    mergeState: mergeState
  }, spec))
}
