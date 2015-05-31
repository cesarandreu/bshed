/**
 * Bikeshed API Utils
 */
const BikeshedApiUtils = {
  /**
   * Fetch list of bikesheds
   * @returns {Promise<Array<Object>>} Promise of bikesheds
   */
  fetchBikeshedList (request) {
    return request('/api/bikesheds', {
      method: 'GET'
    })
  },

  /**
   * Fetch info for bikeshed
   * @params {Object} opts
   * @params {Object} opts.bikeshedId Bikeshed id to fetch
   * @returns {Promise<Object>} Promise of bikeshed
   */
  fetchBikeshedInfo (request, opts) {
    return request(`/api/bikesheds/${opts.bikeshedId}`, {
      method: 'GET'
    })
  },

  /**
   * Create bikeshed
   * @params {Object} opts
   * @param {FormData} opts.body Form body
   * @returns {Promise<Object>} Promise of created bikeshed
   */
  createBikeshed (request, opts) {
    return request('/api/bikesheds', {
      method: 'POST',
      body: opts.body
    })
  }
}

module.exports = BikeshedApiUtils
