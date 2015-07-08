import { BaseStore } from 'fluxible/addons'
import Immutable from 'immutable'

export default class ImmutableStore extends BaseStore {
  constructor (dispatcher) {
    super(dispatcher)
    this._state = Immutable.Map()
  }

  rehydrate (state) {
    this._state = Immutable.fromJS(state)
  }

  dehydrate () {
    return this._state
  }

  getState () {
    return this._state
  }

  setState (nextState) {
    nextState = Immutable.fromJS(nextState)

    const isEqual = this._state.equals(nextState)
    if (!isEqual) {
      this._state = nextState
      this.emitChange(this._state)
    }
    return isEqual
  }

  mergeState (nextStateFragment) {
    return this.setState(
      this._state.merge(nextStateFragment)
    )
  }
}
