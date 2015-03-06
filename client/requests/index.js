module.exports = {
  BikeshedListStore (request, {query}={}) {
    return request.get('/api/bikesheds').query(query)
  }
}
