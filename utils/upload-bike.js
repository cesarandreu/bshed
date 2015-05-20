var assert = require('assert')
var fs = require('fs')

/**
 * Upload bike to s3
 * @param {Object} s3 Client for s3
 * @param {Object} config
 * @param {String} config.BikeId Bike UUID
 * @param {String} config.BikeshedId Bikeshed UUID
 * @param {String} config.file Image location
 * @returns {Promise} Upload bike promise
 */
module.exports = async function uploadBike (s3, {BikeId, BikeshedId, file}={}) {
  assert(s3, 'uploadBike requires s3')
  assert(BikeshedId && BikeId && file, 'uploadBike requires BikeshedId, BikeId, and file')

  var Key = `${BikeshedId}/${BikeId}`
  var Bucket = 'bshed'

  var uploadFileOptions = {
    Body: fs.createReadStream(file),
    ACL: 'public-react',
    Bucket, Key
  }

  try {
    await s3.uploadFilePromise(uploadFileOptions)
  } catch (err) {
    await s3.deleteObjectPromise({Bucket, Key})
    throw err
  }
}
