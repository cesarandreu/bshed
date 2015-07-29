/**
 * Create immutable selector
 * @flow
 */
import { createSelectorCreator } from 'reselect'
import Immutable from 'immutable'

export default createSelectorCreator(Immutable.is)
