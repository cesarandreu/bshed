/**
 * Utils test helpers
 */

/**
 * Execute request helper
 * Returns [url, opts] passed into fn
 */
export function executeRequestHelper (fn, params) {
  return fn((url, opts) => {
    return [url, opts]
  }, params)
}
