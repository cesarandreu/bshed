// ORIGINAL SOURCE: https://github.com/yahoo/fluxible-immutable-utils
const {createStore} = require('fluxible/addons')
const merge = require('lodash/object/merge')
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
  return createStore(merge({
    initialize: initialize,
    rehydrate: rehydrate,
    dehydrate: dehydrate,
    setState: setState,
    getState: getState,
    mergeState: mergeState
  }, spec))
}

// import { createStore } from 'fluxible/addons'
// // import invariant from 'invariant'
// import Immutable from 'immutable'
// import _ from 'lodash'

// export default function createImmutableStore (spec={}) {

//   // spec = Object.assign({
//   //   initialize,
//   //   rehydrate,
//   //   dehydrate,
//   //   getState,
//   //   setState
//   // }, spec)

//   // console.log('spec', spec)

//   // if (!spec.mixins) {
//   //   spec.mixins = []
//   // }

//   // spec.mixins.push({
//   //   // initialize () {
//   //   //   console.log('initialize~')
//   //   //   if (!this._state) {
//   //   //     this._state = Immutable.Map()
//   //   //   }

//   //   //   console.log('this.hanlders', this.hanlders)
//   //   //   Object.keys(this.handlers).forEach(handlerName => {
//   //   //     const action = this.handlers[handlerName]

//   //   //     this[action] = _.wrap(this[action], (handler, payload) => {
//   //   //       const state = this.getState()
//   //   //       const result = handler.call(this, state, payload)
//   //   //       if (result) {
//   //   //         this.setState(result)
//   //   //       }
//   //   //     })
//   //   //   })
//   //   // }
//   // })

//   return createStore(Object.assign({
//     initialize,
//     rehydrate,
//     dehydrate,
//     getState,
//     setState
//   }, spec))
// }

// // function initialize () {
// //   console.log('initialize~')
// //   if (!this._state) {
// //     this._state = Immutable.Map()
// //   }

// //   console.log('this.hanlders', this.hanlders)
// //   Object.keys(this.handlers).forEach(handlerName => {
// //     const action = this.handlers[handlerName]

// //     this[action] = _.wrap(this[action], (handler, payload) => {
// //       const state = this.getState()
// //       const result = handler.call(this, state, payload)
// //       if (result) {
// //         this.setState(result)
// //       }
// //     })
// //   })
// // }

// function initialize () {
//   console.log('initialize....')
//   this._state = Immutable.Map()
// }

// function rehydrate (state) {
//   this._state = Immutable.fromJS(state)
// }

// function dehydrate () {
//   return this._state
// }

// function getState () {
//   return this._state
// }

// function setState (newState) {
//   newState = Immutable.fromJS(newState)

//   const isEqual = this._state.equals(newState)
//   if (!isEqual) {
//     this._state = newState
//     this.emitChange(this._state)
//   }
//   return isEqual
// }

// // function mergeState (stateFragment) {
// //   return this.setState(this._state.merge(stateFragment))
// // }

// /**
//  * Helper for creating an immutable store class
//  *
//  * @method createImmutableStore
//  * @param {Object} spec of the created Store class
//  * @param {String} spec.storeName The name of the store
//  * @param {Object} spec.handlers Hash of action name to method name of action handlers
//  * @param {Function} [spec.initialize] Function called during construction for setting the default `_state` (optional).
//  * @return {Store} Store class
//  **/
// // module.exports = function createImmutableStore (spec) {
// //   return createStore(merge({
// //     initialize: initialize,
// //     rehydrate: rehydrate,
// //     dehydrate: dehydrate,
// //     setState: setState,
// //     getState: getState,
// //     mergeState: mergeState
// //   }, spec))
// // }

// // import { createStore } from 'fluxible/addons'
// // import invariant from 'invariant'
// // import Immutable from 'immutable'
// // import _ from 'lodash'

// // export default function createImmutableStore (spec={}) {
// //   const store = createStore(Object.assign({
// //     initialize,
// //     rehydrate,
// //     dehydrate,
// //     getState,
// //     setState
// //   }, spec))

// //   // Wrap all handlers
// //   Object.keys(store.handlers).forEach(action => {
// //     const handlerName = store.handlers[action]

// //     // Help catch mistakes
// //     invariant(store[handlerName], `Missing handler ${handlerName} for action ${action}`)

// //     store[handlerName] = _.wrap(store[handlerName], function wrapper (handler, payload) {
// //       const state = this.getState()
// //       const result = handler.call(this, state, payload)
// //       if (result) {
// //         this.setState(result)
// //       }
// //     })
// //   })

// //   return store
// // }

// // function initialize () {
// //   this._state = Immutable.Map()
// // }

// // function rehydrate (state) {
// //   this._state = Immutable.fromJS(state)
// // }

// // function dehydrate () {
// //   return this._state
// // }

// // function getState () {
// //   return this._state
// // }

// // function setState (newState) {
// //   newState = Immutable.fromJS(newState)

// //   const isEqual = this._state.equals(newState)
// //   if (!isEqual) {
// //     this._state = newState
// //     this.emitChange(this._state)
// //   }
// //   return isEqual
// // }

// // // function mergeState (stateFragment) {
// // //   return this.setState(this._state.merge(stateFragment))
// // // }

// // /**
// //  * Helper for creating an immutable store class
// //  *
// //  * @method createImmutableStore
// //  * @param {Object} spec of the created Store class
// //  * @param {String} spec.storeName The name of the store
// //  * @param {Object} spec.handlers Hash of action name to method name of action handlers
// //  * @param {Function} [spec.initialize] Function called during construction for setting the default `_state` (optional).
// //  * @return {Store} Store class
// //  **/
// // // module.exports = function createImmutableStore (spec) {
// // //   return createStore(merge({
// // //     initialize: initialize,
// // //     rehydrate: rehydrate,
// // //     dehydrate: dehydrate,
// // //     setState: setState,
// // //     getState: getState,
// // //     mergeState: mergeState
// // //   }, spec))
// // // }

// // export class ImmutableStore extends BaseStore {
// //   constructor (dispatcher) {
// //     super(dispatcher)
// //     this._state = Immutable.Map()
// //   }

// //   setState (newState) {
// //     newState = Immutable.fromJS(newState)

// //     const isEqual = this._state.equals(newState)
// //     if (!isEqual) {
// //       this._state = newState
// //       this.emitChange(this._state)
// //     }
// //     return isEqual
// //   }

// //   getState () {
// //     return this._state
// //   }

// //   rehydrate (state) {
// //     this._state = Immutable.fromJS(state)
// //   }

// //   dehydrate () {
// //     return this._state
// //   }
// // }
