var config = require('./webpack.make')
module.exports = [
  config({BUILD: true, SERVER: false}),
  config({BUILD: true, SERVER: true})
]
