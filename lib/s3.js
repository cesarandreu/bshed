const assert = require('assert')
const AWS = require('aws-sdk')

/**
 * Create s3 client
 * @param {Object} config AWS configuration
 * @returns {Object} s3 client and helpers
 */
module.exports = function s3Loader (config) {
  assert(config, 's3Loader requires config')
  const client = new AWS.S3(config)

  return {
    client,
    uploadFilePromise,
    deleteObjectPromise
  }

  function uploadFilePromise (uploadConfig) {
    return new Promise((resolve, reject) => {
      client.upload(uploadConfig, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    })
  }

  function deleteObjectPromise (deleteConfig) {
    return new Promise((resolve, reject) => {
      client.deleteObject(deleteConfig, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    })
  }
}
