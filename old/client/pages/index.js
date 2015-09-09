/**
 * Pages
 * @flow
 */
import { combineReducers } from 'redux'

// Pages
import {
  BikeshedBuilderReducer
} from './BikeshedBuilder'

// Reducers
export const reducers = combineReducers({
  BikeshedBuilder: BikeshedBuilderReducer
})
