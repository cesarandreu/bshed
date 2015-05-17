var assert = require('assert')
var AWS = require('aws-sdk')

/**
 * Create s3 client
 * @param {Object} config AWS configuration
 * @returns {Object} s3 client and helpers
 */
module.exports = function s3Loader (config) {
  assert(config, 's3Loader requires config')
  var client = new AWS.S3(config)

  client.endpoint = config.endpoint

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
