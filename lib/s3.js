var assert = require('assert')
var AWS = require('aws-sdk')

module.exports = function s3Loader (awsConfig) {
  assert(awsConfig, 's3Loader requires awsConfig')
  var client = new AWS.S3(awsConfig)

  return {
    client,
    attemptUpload,
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

  function* attemptUpload ({upload, destroy}={}) {
    assert(upload && destroy, 'upload and destroy required for attemptUpload')
    try {
      return yield client.uploadFilePromise(upload)
    } catch (err) {
      return yield client.deleteObjectsPromise(destroy)
    }
  }

}
