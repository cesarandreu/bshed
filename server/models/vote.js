/**
 * Vote model
 */
import Joi from 'joi'
import BaseModel from './model'
import invariant from 'invariant'

const VoteSchema = Joi.object()
.keys({
  createdAt: Joi.date(),
  id: Joi.string().guid(),
  userId: Joi.string().guid().required(),
  bikeshedId: Joi.string().guid().required(),
  ratings: Joi.array().min(2).max(8).unique().items(
    Joi.number().integer().less(8).positive().required()
  ).required()
})
.requiredKeys(['userId', 'bikeshedId'])

const PROPS = {
  SCHEMA: VoteSchema,
  INDEXES: ['userId', 'bikeshedId', 'userBikeshedVote'],
  TABLE: 'votes',
  TYPE: 'Vote'
}

export default class Vote extends BaseModel {
  async createIndexes () {
    const indexList = await this.r.table(this.TABLE).indexList()
    if (!indexList.includes('userBikeshedVote')) {
      await this.r.table(this.TABLE).indexCreate(
        'userBikeshedVote', [this.r.row('userId'), this.r.row('bikeshedId')]
      )
    }
    await super.createIndexes()
  }

  validate (values) {
    values = super.validate(values)

    // Add extra validation that total must be the sum of ratings - 1
    // The schema makes sure that each entry is unique and within expected ranges
    // This extra check makes sure that each bike is rated with correct values
    // For example, if we have 2 results, it should have a 0 and a 1 rating
    // Using the ((n * (n + 1)) / 2) formula to avoid extra work :D
    const total = values.ratings.reduce((total, rating) => total + rating, 0)
    const length = values.ratings.length - 1
    invariant(
      total === (length * (length + 1)) / 2,
      'Must vote on each image'
    )
    return values
  }

  // Get the number of votes on a bikeshed
  async bikeshedCount (bikeshedId: string) {
    return await this.r.table(this.TABLE)
      .getAll(bikeshedId, { index: 'bikeshedId' })
      .count()
  }

  // Get the score for each bike in a bikeshed
  async bikeshedScores (bikeshedId: string) {
    return await this.r.table(this.TABLE)
      .getAll(bikeshedId, { index: 'bikeshedId' })
      .group('ratings', { multi: true })
      .ungroup()
      .map(doc => doc.sum())
  }

  async bikeshedUserRatings (userId: string, bikeshedId: string) {
    const [vote] = await this.r.table(this.TABLE)
      .getAll([userId, bikeshedId], { index: 'userBikeshedVote' })
    return vote ? vote.ratings : []
  }

  async hasVoted (userId: string, bikeshedId: string) {
    const hasVoted = await this.r.table(this.TABLE)
      .getAll([userId, bikeshedId], { index: 'userBikeshedVote' })
      .count()
    return Boolean(hasVoted)
  }
}
Object.assign(Vote.prototype, PROPS)
