var assert = require('assert')
var AWS = require('aws-sdk')

var config = {
  development: {
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
    apiVersion: '2014-11-23',
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:10001')
  },
  test: {
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
    apiVersion: '2014-11-23',
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:10001')
  },
  production: {
    accessKeyId: '',
    secretAccessKey: '',
    apiVersion: '2014-11-23',
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:10001')
  }
}

module.exports = function awsConfig (env) {
  assert(env && config[env], `aws config env ${env} is invalid`)
  return config[env]
}
