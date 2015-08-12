/**
 * Create executeRequest
 * @flow
 */
import debug from 'debug'
const log = debug('bshed:client:request')

/**
 * Helper to safely execute requests using fetcher
 */
export default function createExecuteRequest (fetcher: Function): Function {

  /**
   * Execute fn with fetcher and payload
   */
  return function executeRequest (fn: Function, payload={}): Promise {
    log(`Executing request ${fn.displayName || fn.name} with payload`, payload)
    try {
      return Promise.resolve(fn(fetcher, payload))
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
