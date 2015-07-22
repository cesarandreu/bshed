// SOURCE: https://github.com/quangbuule/redux-example/blob/redux%40v1.0.0-rc/src/js/lib/createReducer.js
import Immutable, { Map, List } from 'immutable'

export default function createReducer (initialState, handlers) {
  const StateConstructor = initialState.constructor
  return (state = initialState, action) => {
    if (!Map.isMap(state) && !List.isList(state) && !(state instanceof StateConstructor)) {
      state = Immutable.fromJS(state)
    }

    const handler = handlers[action.type]

    if (!handler) {
      return state
    }

    state = handler(state, action)

    if (!Map.isMap(state) && !List.isList(state) && !(state instanceof StateConstructor)) {
      throw new TypeError('Reducers must return Immutable objects.')
    }

    return state
  }
}
