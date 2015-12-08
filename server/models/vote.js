/**
 * Vote model
 */
import createModel from './model'
import Joi from 'joi'

const VoteBase = {
  INDEXES: {
    bikeshedId: 'bikeshedId',
    userBikeshedVote (r) {
      return r.table(VoteBase.TABLE).indexCreate(
        'userBikeshedVote',
        [r.row('userId'), r.row('bikeshedId')]
      )
    },
    userId: 'userId'
  },

  SCHEMA: Joi.object({
    bikeshedId: Joi.string().guid().required(),
    createdAt: Joi.date(),
    id: Joi.string().guid(),
    ratings: Joi.array().length(2).unique().items(
      Joi.any().valid([0, 1])
    ).required(),
    updatedAt: Joi.date(),
    userId: Joi.string().guid().required()
  }),

  TABLE: 'votes',

  TYPE: 'Vote'
}

export default function createVote ({ r }) {
  const BaseModel = createModel({ r }, VoteBase)
  const Vote = Object.create(BaseModel, {
  })
  return Vote
}

Object.assign(createVote, VoteBase)
