/**
 * Create fetcher
 * @flow
 */
import debug from 'debug'
import cookies from 'cookies-js'
const log = debug('bshed:client:Fetcher')

/**
 * @param {Object} options
 * @param {GlobalFetch.fetch} [options.fetch=global.fetch]
 * @param {Headers} [options.Headers=global.Headers]
 */
export default function createFetcher (
  { fetch=global.fetch, Headers=global.Headers, rootUrl='', cookie='' }={}
) {

  return {
    executeRequest,
    fetcher
  }

  /**
   * Execute fn with fetcher and payload
   * @param {Function} fn
   * @param {*} [payload={}]
   * @returns {Promise<Response>}
   */
  function executeRequest (fn: Function, payload={}) {
    log(`Executing request ${fn.displayName || fn.name} with payload`, payload)
    try {
      return Promise.resolve(fn(fetcher, payload))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  /**
   * Like fetch but with extra functionality
   * @param {string} [url='']
   * @param {Object} [options={}]
   */
  function fetcher (url='', options={}) {
    const localRequest = url[0] === '/'
    const { headers, ...fetchOptions } = Object.assign({}, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {}
    }, options)

    fetchOptions.headers = new Headers(headers)

    if (localRequest) {
      // Prefix rootUrl
      url = `${rootUrl}${url}`
      console.log('url', url)
      console.log('isMutatingMethod', isMutatingMethod(fetchOptions.method))
      // Set csrf token
      if (isMutatingMethod(fetchOptions.method)) {
        fetchOptions.headers.set('X-XSRF-TOKEN', cookies.get('XSRF-TOKEN'))
        console.log('headers', fetchOptions.headers.get('X-XSRF-TOKEN'))
      }

      // Set cookie
      console.log('cookie', cookie)
      if (cookie) {
        fetchOptions.headers.set('COOKIE', cookie)
      }
    }

    return fetch(url, { ...fetchOptions })
  }
}

/**
 * HELPER FUNCTIONS
 */

/**
 * Check if method mutates
 * @param {string} [method='GET']
 * @returns {boolean} If the HTTP method mutates
 */
function isMutatingMethod (method='GET') {
  return ['GET', 'HEAD', 'OPTIONS'].indexOf(method.toUpperCase()) === -1
}
