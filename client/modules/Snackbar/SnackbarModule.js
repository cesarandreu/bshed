import sleep from 'then-sleep'
import uuid from 'node-uuid'
import { call, put, take } from 'redux-saga/effects'
import { createSelector } from 'reselect'

// Constants
const SNACKBAR_DURATION = 3e3

// Action constants
const ADD_SNACKBAR = 'modules/Snackbar/ADD_SNACKBAR'
const REMOVE_SNACKBAR = 'modules/Snackbar/REMOVE_SNACKBAR'

// Actions
export const SnackbarActions = {
  addSnackbar (message) {
    const id = uuid.v4()
    return {
      type: ADD_SNACKBAR,
      payload: { id, message }
    }
  },
  removeSnackbar (id) {
    return {
      type: REMOVE_SNACKBAR,
      payload: { id }
    }
  }
}

// Sagas
function * watchSnackbars (getState) {
  while (
    SnackbarSelectors.hasSnackbar(getState()) ||
    (yield take([ADD_SNACKBAR, REMOVE_SNACKBAR]))
  ) {
    if (SnackbarSelectors.hasSnackbar(getState())) {
      yield call(sleep, SNACKBAR_DURATION)

      const currentSnackbar = SnackbarSelectors.currentSnackbar(getState())
      yield put(SnackbarActions.removeSnackbar(currentSnackbar.id))
    }
  }
}

export const SnackbarSagas = [
  watchSnackbars
]

// Selectors
export const SnackbarSelectors = {
  snackbarList (state) {
    return state.Snackbar
  }
}

function currentSnackbar (snackbarList) {
  return snackbarList[0]
}

function hasSnackbar (snackbarList) {
  return snackbarList.length !== 0
}

Object.assign(SnackbarSelectors, {
  currentSnackbar: createSelector([SnackbarSelectors.snackbarList], currentSnackbar),
  hasSnackbar: createSelector([SnackbarSelectors.snackbarList], hasSnackbar)
})

// Reducer
export function SnackbarReducer (state = [], { payload, type }) {
  switch (type) {
    case ADD_SNACKBAR:
      return [...state, { id: payload.id, message: payload.message }]
    case REMOVE_SNACKBAR:
      return state.filter(({ id }) => id !== payload.id)
    default:
      return state
  }
}

// Module
export default {
  actions: SnackbarActions,
  reducer: SnackbarReducer,
  sagas: SnackbarSagas,
  selectors: SnackbarSelectors
}
