/**
 * Create reducer
 * @flow
 */
import { Collection } from 'immutable'

export default function createReducer (initialState: Collection, handlers: Object) {
  if (process.env.NODE_ENV !== 'production' && ('undefined' in handlers)) {
    console.warn('Found key "undefined" in reducer handlers')
  }

  const StateConstructor = initialState.constructor
  return function reducer (state = initialState, action: Object): StateConstructor {
    if (process.env.NODE_ENV !== 'production' && !(state instanceof StateConstructor)) {
      console.warn('State is not an instance of StateConstructor')
    }

    const handler = handlers[action.type]
    if (!handler) {
      return state
    }

    state = handler(state, action)
    if (!(state instanceof StateConstructor)) {
      throw new TypeError('Reducers must return an instance of StateConstructor')
    }

    return state
  }
}
