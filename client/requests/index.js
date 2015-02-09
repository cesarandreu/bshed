module.exports = {
  BikeshedListStore: function getBikeshedList (request, opts) {
    return request.get('/api/bikesheds').query(opts.query)
  }
};
