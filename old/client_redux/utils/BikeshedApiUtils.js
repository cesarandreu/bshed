/**
 * Bikeshed API Utils
 * @flow
 */

/**
 * Fetch bikeshed list
 * @param {fetcher} fetcher
 * @param {Object} options
 */
export function fetchBikeshedList (fetcher, options) {
  return fetcher('/api/bikesheds', {
    method: 'GET'
  })
}

/**
 * Fetch bikeshed information
 * @param {fetcher} fetcher
 * @param {Object} options
 * @param {string} options.bikeshedId Bikeshed to fetch
 * @returns {Promise} Promise of requested bikeshed
 */
export function fetchBikeshedInfo (fetcher, { bikeshedId }) {
  return fetcher(`/api/bikesheds/${bikeshedId}`, {
    method: 'GET'
  })
}

/**
 * Create bikeshed
 * @param {fetcher} fetcher
 * @param {Object} options
 * @param {FormData} options.body
 * @returns {Promise} Promise of created bikeshed
 */
export function createBikeshed (fetcher, { body }) {
  return fetcher('/api/bikesheds', {
    method: 'POST',
    body: body
  })
}
