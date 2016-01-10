/**
 * Vote model
 * Constraints:
 *  Must have a unique combination of [bikeshedId, userId, value]
 * Fields:
 *  bikeId {string} uuid for the associated bike
 *  bikeshedId {string} uuid for the associated bikeshed
 *  createdAt {timestamptz} When the vote was created
 *  id {string} uuid for the vote
 *  userId {string} uuid for the associated user
 *  updatedAt {timestamptz} When the vote last updated
 *  value {number} How much this vote is worth (Currently one of [0, 1, 2, 3, 4, 5])
 * Indexes:
 *  @TODO
 */
export default function createVote (models) {
  const Vote = models.bookshelf.Model.extend({
    hasTimestamps: true,
    tableName: 'votes',

    bike () {
      return this.belongsTo(models.Bike)
    },

    bikeshed () {
      return this.belongsTo(models.Bikeshed)
    },

    user () {
      return this.belongsTo(models.User)
    }
  })

  return Vote
}
