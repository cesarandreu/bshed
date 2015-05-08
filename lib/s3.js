var assert = require('assert')
var AWS = require('aws-sdk')

module.exports = function s3Loader (awsConfig) {
  assert(awsConfig, 's3Loader requires awsConfig')
  var client = new AWS.S3(awsConfig)

  client.endpoint = awsConfig.endpoint

  return {
    client,
    uploadFilePromise,
    deleteObjectsPromise
  }

  function uploadFilePromise (uploadConfig) {
    return new Promise((resolve, reject) => {
      client.upload(uploadConfig, (err, data) => err ? reject(err) : resolve(data))
    })
  }

  function deleteObjectsPromise (deleteConfig) {
    return new Promise((resolve, reject) => {
      client.deleteObject(deleteConfig, (err, data) => err ? reject(err) : resolve(data))
    })
  }
}
