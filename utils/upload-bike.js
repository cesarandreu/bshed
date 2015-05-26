const assert = require('assert')
const fs = require('fs')

/**
 * Upload bike to s3
 * @param {Object} s3 Client instance of s3
 * @param {Object} config
 * @param {string} config.BikeId Bike UUID
 * @param {string} config.BikeshedId Bikeshed UUID
 * @param {string} config.file Image location
 * @returns {Promise} Upload bike promise
 */
module.exports = async function uploadBike (s3, {BikeId, BikeshedId, file}={}) {
  assert(s3, 'uploadBike requires s3')
  assert(BikeshedId && BikeId && file, 'uploadBike requires BikeshedId, BikeId, and file')

  const Key = `${BikeshedId}/${BikeId}`
  const Bucket = 'bshed'

  const uploadFileOptions = {
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
