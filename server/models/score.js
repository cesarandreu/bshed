/**
 * Score model
 * Constraints:
 *  Must have a unique combination of [voteId, bikeId]
 * Fields:
 *  bikeId {string} uuid for he associated bike
 *  createdAt {timestamptz} When the vote was created
 *  id {string} uuid for the vote
 *  updatedAt {timestamptz} When the vote last updated
 *  value {number} How much this vote is worth (Currently one of [0, 1, 2, 3, 4, 5])
 *  voteId {string} uuid for the associated vote
 * Indexes:
 *  @TODO
 */
export default function createVote (models) {
  const Score = models.bookshelf.Model.extend({
    hasTimestamps: true,
    tableName: 'scores',

    bike () {
      return this.belongsTo(models.Bike)
    },

    vote () {
      return this.belongsTo(models.Vote)
    }
  })

  return Score
}
