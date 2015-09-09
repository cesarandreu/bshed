/**
 * Create fetcher
 * @flow
 */
import cookies from 'cookies-js'

/**
 * @param {Object} options
 * @param {GlobalFetch.fetch} [options.fetch=global.fetch]
 * @param {Headers} [options.Headers=global.Headers]
 * @param {string} [options.rootUrl='']
 * @param {string} [options.cookie='']
 */
export default function createFetcher (
  { fetch=global.fetch, Headers=global.Headers, rootUrl='', cookie='' }={}
) {

  /**
   * Like fetch but with extra functionality
   * @param {string} [url='']
   * @param {Object} [options={}]
   */
  return function fetcher (url='', options={}) {
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
 */
function isMutatingMethod (method='GET'): boolean {
  return ['GET', 'HEAD', 'OPTIONS'].indexOf(method.toUpperCase()) === -1
}
