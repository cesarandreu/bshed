// SOURCE: https://github.com/petehunt/react-raf-batching/issues/8
// Based on https://github.com/petehunt/react-raf-batching
// but also triggers `tick` regularly if tab is inactive.

import ReactUpdates from 'react/lib/ReactUpdates'

const flush = ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
const requestAnimationFrame = global.requestAnimationFrame
const FORCE_TICK_INTERVAL = 1000
let timeout

function tick () {
  flush()
  requestAnimationFrame(tick)
  clearTimeout(timeout)
  // Do not call `tick()`, that could cause multiple RAF cycles and hog CPU.
  timeout = setTimeout(forceTick, FORCE_TICK_INTERVAL)
}

function forceTick () {
  flush()
  timeout = setTimeout(forceTick, FORCE_TICK_INTERVAL)
}

const ReactRAFBatchingStrategy = {
  isBatchingUpdates: true,

  /**
   * Call the provided function in a context within which calls to `setState`
   * and friends are batched such that components aren't updated unnecessarily.
   */
  batchedUpdates (callback) {
    callback.apply(null, Array.prototype.slice.call(arguments, 1))
  },

  inject () {
    ReactUpdates.injection.injectBatchingStrategy(ReactRAFBatchingStrategy)
    tick()
  }
}

export default ReactRAFBatchingStrategy
