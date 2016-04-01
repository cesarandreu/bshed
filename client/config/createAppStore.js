import { reducers, sagas } from 'client/modules'
import { applyMiddleware, createStore } from 'redux'
import sagaMiddleware from 'redux-saga'

export default function createAppStore (initialState) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(
      sagaMiddleware(...sagas)
    )
  )

  return store
}
