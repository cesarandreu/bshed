/**
 * Fetcher
 * @flow
 */
import debug from 'debug'
import cookies from 'cookies-js'

const log = debug('bshed:client:Fetcher')

export default class Fetcher {
  /**
   * Check if method requires setting xsrf token
   * @param {string} [method='GET']
   * @returns {boolean} Whether or not xsrf token needs to be set
   */
  static shouldSetXsrfToken (method='GET') {
    return ['GET', 'HEAD', 'OPTIONS'].indexOf(method.toUpperCase()) === -1
  }

  /**
   * Create Fetcher instance
   * @param {Object} options
   * @param {GlobalFetch.fetch} [options.fetch=global.fetch]
   * @param {Headers} [options.Headers=global.Headers]
   * @param {string} [options.rootUrl='']
   * @param {string} [options.cookie='']
   */
  constructor ({ fetch=global.fetch, Headers=global.Headers, rootUrl='', cookie='' }={}) {
    Object.assign(this, { fetch, Headers, rootUrl, cookie })
    this.executeRequest = this.executeRequest.bind(this)
    this.fetcher = this.fetcher.bind(this)
  }

  /**
   * Like fetch but with extra functionality
   * Appends rootUrl if the url has a leading slash
   * Adds xsrf token if it's needed for the request
   * Adds cookies if they're passed to constructor
   * @param [url='']
   * @param [options={}]
   * @returns {Promise<Response>}
   */
  fetcher (url='', options={}) {
    const { fetch, Headers, cookie } = this

    if (url[0] === '/') {
      url = `${this.rootUrl}${url}`
    }

    const { headers, ...fetchOptions } = Object.assign({
      credentials: 'same-origin',
      method: 'GET',
      headers: {}
    }, options)

    fetchOptions.headers = new Headers(headers)
    if (Fetcher.shouldSetXsrfToken(fetchOptions.method)) {
      fetchOptions.headers.set('X-XSRF-TOKEN', cookies.get('XSRF-TOKEN'))
    }
    if (cookie) {
      fetchOptions.headers.set('COOKIE', cookie)
    }

    return fetch(url, fetchOptions)
  }

  /**
   * Execute fn with fetcher and payload
   * @param {Function} fn
   * @param {*} [payload={}]
   * @returns {Promise<Response>}
   */
  executeRequest (fn: Function, payload={}) {
    log(`Executing request ${fn.displayName || fn.name} with payload`, payload)
    try {
      return Promise.resolve(fn(this.fetcher, payload))
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
