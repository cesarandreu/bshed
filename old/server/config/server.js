module.exports = {
  development: {
    port: 3000,
    keys: ['secret']
  },
  test: {
    port: 4000,
    keys: ['secret']
  },
  production: {
    port: process.env.PORT || 3000,
    keys: (process.env.SECRET || '').split(',')
  }
}
