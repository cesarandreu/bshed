var co = require('co')
var _ = require('lodash')
var wait = require('co-wait')

/**
 * retry
 * ripped off from co-retry
 * Execute fn and retry on failure
 */
exports.retry = function* retry (fn, {attempts=3, interval=300, delta=150}={}) {
  while (true) {
    try {
      return yield co(fn)
    } catch (err) {
      if (!(attempts--)) throw err
      yield wait(_.random(interval - delta, interval + delta))
    }
  }
}
