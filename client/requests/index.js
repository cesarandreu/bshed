var {format} = require('url')

module.exports = {
  BikeshedListStore (fetch, {query}={}) {
    var url = format({
      pathname: '/api/bikesheds',
      query: query
    })
    return fetch(url)
  }
}
