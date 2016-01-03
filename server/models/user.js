/**
 * User model
 * Fields:
 *  createdAt {timestamptz} When the user was created
 *  digest {string} Password digest
 *  email {string} User email
 *  id {string} uuid for the user
 *  name {string} User name
 *  registeredAt {timestamptz} When the user registered
 *  updatedAt {timestamptz} When the user was last updated
 * Indexes:
 *  @TODO
 */
export default function createUser (models) {
  const User = models.bookshelf.Model.extend({
    hasTimestamps: true,
    tableName: 'users',
    bikesheds () {
      return this.hasMany(models.Bikeshed)
    },

    virtuals: {
      isRegistered () {
        return Boolean(this.get('registeredAt'))
      }
    },

    votes () {
      return this.hasMany(models.Votes)
    }
  })

  return User
}
