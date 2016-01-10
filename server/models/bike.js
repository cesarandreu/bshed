/**
 * Bike model
 * Fields:
 *  bikeshedId {string} Associated bikeshed's uuid
 *  createdAt {timestamptz} When the bike was created
 *  field {string} Image field name (One of [0, 1, 2, 3, 4, 5])
 *  height {number} Image height in pixels
 *  id {string} uuid for the bike
 *  key {number} Field number (One of [0, 1, 2, 3, 4, 5])
 *  name {string} Bike name, defaults to the file name
 *  mimetype {string} Image mimetype (One of [image/jpeg, image/png])
 *  size {number} Uncompressed original image size in bytes
 *  updatedAt {timestamptz} When the bike was last updated
 *  width {number} Image width in pixels
 * Indexes:
 *  @TODO
 */
import mime from 'mime-types'

export default function createBike (models) {
  const Bike = models.bookshelf.Model.extend({
    hasTimestamps: true,
    tableName: 'bikes',

    bikeshed () {
      return this.belongsTo(models.Bikeshed)
    },

    getUrl (size) {
      const bikeshedId = this.get('bikeshedId')
      const extension = this.get('extension')
      const key = this.get('key')
      return `/images/${bikeshedId}/${key}/${size}.${extension}`
    },

    scores () {
      return this.hasMany(models.Score)
    },

    virtuals: {
      extension () {
        return mime.extension(this.get('mimetype'))
      },
      ratio () {
        return this.get('width') / this.get('height')
      }
    }
  })

  return Bike
}
