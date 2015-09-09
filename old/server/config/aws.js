const AWS = require('aws-sdk')

module.exports = {
  development: {
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
    apiVersion: '2015-05-18',
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:10001')
  },
  test: {
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
    apiVersion: '2015-05-18',
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:10001')
  },
  production: {
    accessKeyId: '',
    secretAccessKey: '',
    apiVersion: '2015-05-18',
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:10001')
  }
}
