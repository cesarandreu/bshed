/**
 * Vote model
 * Constraints:
 *  Must have a unique combination of [userId, bikeshedId]
 * Fields:
 *  bikeshedId {string} uuid for the associated bikeshed
 *  createdAt {timestamptz} When the vote was created
 *  id {string} uuid for the vote
 *  userId {string} uuid for the associated user
 *  updatedAt {timestamptz} When the vote last updated
 * Indexes:
 *  @TODO
 */
export default function createVote (models) {
  const Vote = models.bookshelf.Model.extend({
    hasTimestamps: true,
    tableName: 'votes',

    bikeshed () {
      return this.belongsTo(models.Bikeshed)
    },

    scores () {
      return this.hasMany(models.Score)
    },

    user () {
      return this.belongsTo(models.User)
    }
  })

  return Vote
}
