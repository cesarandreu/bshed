/**
 * Screen module is responsible for storing the screen size
 * When the screen is a square, the orientation is portrait
 * Orientation is either 'landscape' or 'portrait'
 */
import { createSelector } from 'reselect'

// Sizes
const XSMALL_SCREEN = 600
const SMALL_SCREEN = 920
const MEDIUM_SCREEN = 1280
const LARGE_SCREEN = 1920

// Action constants
const UPDATE_SIZE = 'modules/Screen/UPDATE_SIZE'

// Actions
export const ScreenActions = {
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
export const ScreenSelectors = {
  screen (state) {
    return state.Screen
  }
}

function height (screen) {
  return screen.height
}

function width (screen) {
  return screen.width
}

Object.assign(ScreenSelectors, {
  height: createSelector([ScreenSelectors.screen], height),
  width: createSelector([ScreenSelectors.screen], width)
})

function isXSmall (width) {
  return width < XSMALL_SCREEN
}

function isSmall (width) {
  return width >= XSMALL_SCREEN && width < SMALL_SCREEN
}

function isMedium (width) {
  return width >= SMALL_SCREEN && width < MEDIUM_SCREEN
}

function isLarge (width) {
  return width >= MEDIUM_SCREEN && width < LARGE_SCREEN
}

function isXLarge (width) {
  return width >= LARGE_SCREEN
}

function orientation (height, width) {
  return height < width
    ? 'landscape'
    : 'portrait'
}

Object.assign(ScreenSelectors, {
  isXSmall: createSelector([ScreenSelectors.width], isXSmall),
  isSmall: createSelector([ScreenSelectors.width], isSmall),
  isMedium: createSelector([ScreenSelectors.width], isMedium),
  isLarge: createSelector([ScreenSelectors.width], isLarge),
  isXLarge: createSelector([ScreenSelectors.width], isXLarge),
  orientation: createSelector([ScreenSelectors.height, ScreenSelectors.width], orientation)
})

// Reducer
export function ScreenReducer (state = { height: 0, width: 0 }, { payload, type }) {
  switch (type) {
    case UPDATE_SIZE:
      const { height, width } = payload
      return {
        height,
        width
      }
    default:
      return state
  }
}

// Module
export default {
  actions: ScreenActions,
  reducer: ScreenReducer,
  sagas: ScreenSagas,
  selectors: ScreenSelectors
}
