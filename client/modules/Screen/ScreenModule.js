import { createSelector } from 'reselect'

// Constants
const UPDATE_ORIENTATION = 'modules/Screen/UPDATE_ORIENTATION'
const UPDATE_SIZE = 'modules/Screen/UPDATE_SIZE'

// Actions
export const ScreenActions = {
  updateOrientation (orientation: string) {
    return {
      type: UPDATE_ORIENTATION,
      payload: { orientation }
    }
  },
  updateSize ({ height, width }: { height: number, width: number }) {
    return {
      type: UPDATE_SIZE,
      payload: { height, width }
    }
  }
}

// Sagas
export const ScreenSagas = []

// Selectors
function height (screen) {
  return screen.height
}

function orientation (screen) {
  return screen.orientation
}

function screen (state) {
  return state.Screen
}

function width (screen) {
  return screen.width
}

export const ScreenSelectors = {
  height: createSelector([screen], height),
  orientation: createSelector([screen], orientation),
  screen: screen,
  width: createSelector([screen], width)
}

// Reducer
const INITIAL_STATE = {
  height: 0,
  orientation: 'landscape',
  width: 0
}

export function ScreenReducer (state = { ...INITIAL_STATE }, { payload, type }) {
  switch (type) {
    case UPDATE_ORIENTATION:
      return {
        ...state,
        orientation: payload.orientation
      }
    case UPDATE_SIZE:
      return {
        ...state,
        height: payload.height,
        width: payload.width
      }
    default:
      return state
  }
}
