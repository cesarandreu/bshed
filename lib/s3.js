var assert = require('assert')
var AWS = require('aws-sdk')
var s3 = require('s3')
var co = require('co')

/**
 * s3Loader
 * Returns s3Client using config
 */
module.exports = function s3Loader (config) {
  assert(config, 's3Loader required config')

  var s3Client = s3.createClient({
    s3Client: new AWS.S3(config)
  })

  s3Client.uploadFilePromise = function uploadFilePromise (config) {
    return new Promise((resolve, reject) => {
      s3Client.uploadFile(config)
        .on('error', reject)
        .on('end', resolve)
    })
  }

  s3Client.deleteObjectsPromise = function deleteObjectsPromise (config) {
    return new Promise((resolve, reject) => {
      s3Client.deleteObjects(config)
        .on('error', reject)
        .on('end', resolve)
    })
  }

  s3Client.attemptUpload = co.wrap(function* attemptUpload ({upload, destroy}={}) {
    assert(upload && destroy, 'upload and destroy required for attemptUpload')
    try {
      return yield s3Client.uploadFilePromise(upload)
    } catch (err) {
      return yield s3Client.deleteObjectsPromise(destroy)
    }
  })

  s3Client.endpoint = config.endpoint

  return s3Client
}
