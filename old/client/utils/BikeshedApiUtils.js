/**
 * Bikeshed API Utils
 * @flow
 */

/**
 * Fetch bikeshed list
 */
export function fetchBikeshedList (fetcher: Function) {
  return fetcher('/api/bikesheds', {
    method: 'GET'
  })
}

/**
 * Fetch bikeshed information
 */
export function fetchBikeshedInfo (fetcher: Function, options: Object) {
  const { bikeshedId }: { bikeshedId: number } = options
  return fetcher(`/api/bikesheds/${bikeshedId}`, {
    method: 'GET'
  })
}

/**
 * Create bikeshed
 */
export function createBikeshed (fetcher: Function, options: Object) {
  const { body }: { body: Object } = options
  return fetcher('/api/bikesheds', {
    method: 'POST',
    body: body
  })
}
