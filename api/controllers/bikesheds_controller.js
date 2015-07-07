import Joi from 'joi'
import _ from 'lodash'
import Router from 'koa-router'
import bodyParser from 'koa-body'
import middleware from '../../utils/middleware'
import getFullBikeshed from '../../utils/get-full-bikeshed'

/**
 * Bikesheds controller
 */
export default function BikeshedsController () {

  // Middleware
  const auth = middleware.authenticate()
  const loadBikeshed = middleware.load('Bikeshed')

  const parseJsonForm = bodyParser()

  // @TODO: use multer to set file size limit
  const parseFileForm = bodyParser({
    multipart: true,
    formidable: {
      multiples: true
    }
  })

  const checkCreateSchema = middleware.checkSchema(
    BikeshedsController.create.schema
  )
  const checkRateSchema = middleware.checkSchema(
    BikeshedsController.rate.schema
  )

  // Routes
  const routes = new Router({
    prefix: '/api'
  })
  .get(
    '/bikesheds',
    BikeshedsController.index
  )
  .post(
    '/bikesheds',
    auth,
    parseFileForm,
    checkCreateSchema,
    BikeshedsController.create
  )
  .get(
    '/bikesheds/:bikeshed',
    BikeshedsController.show
  )
  .post(
    '/bikesheds/:bikeshed/votes',
    auth,
    loadBikeshed,
    parseJsonForm,
    checkRateSchema,
    BikeshedsController.rate
  )

  return routes.middleware()
}

/**
 * GET /api/bikesheds
 * @query {limit=20}
 * @query {after=Date.now()}
 */
BikeshedsController.index = function * index () {
  const {Bikeshed} = this.models
  const query = this.query

  // Query params
  const limit = BikeshedsController.index.getLimit(query.limit)
  const after = BikeshedsController.index.getAfter(query.after)

  const bikesheds = yield Bikeshed.findAll({
    limit: limit,
    order: [
      ['createdAt', 'DESC']
    ],
    where: {
      createdAt: {
        $lt: after
      }
    }
  })

  this.body = yield bikesheds.map(bikeshed =>
    getFullBikeshed({
      BikeshedId: bikeshed.id,
      user: this.state.user,
      models: this.models
    })
  )
}

/**
 * Get limit
 * Must be a number between 0 and 100
 * Invalid input will return 20
 * @param {(number|string)} [limit] Value to convert to limit
 * @returns {number} limit
 */
BikeshedsController.index.getLimit = function getLimit (limit) {
  limit = /^([0-9]{1,3})$/.test(limit) ? Number(limit) : 20
  return limit < 0 || limit > 100 ? 20 : limit
}

/**
 * Get after
 * Must be a unix timestamp number or Date string
 * Invalid input will return a Date with the current time
 * @param {*} [after] Value to convert to after
 * @returns {Date} after
 */
BikeshedsController.index.getAfter = function getAfter (after) {
  after = new Date(/^([0-9]+)$/.test(after) ? Number(after) * 1000 : after)
  return after.valueOf() ? after : new Date()
}

/**
 * POST /api/bikesheds
 */
BikeshedsController.create = function * create () {
  const {Bikeshed, Bike} = this.models
  const {user, body} = this.state
  const {fields, files} = body

  // Do everything in a transaction
  const transaction = yield this.models.sequelize.transaction()
  try {

    // Create bikeshed
    const bikeshed = this.state.bikeshed = yield Bikeshed.create({
      description: fields.description,
      UserId: user.id
    }, {
      transaction
    })

    // Create bikes
    yield Object.keys(files).map(name => {
      return Bike.createAndUpload({
        BikeshedId: bikeshed.id,
        file: files[name]
      }, {
        s3: this.s3,
        transaction
      })
    })

    // Finished
    yield transaction.commit()
  } catch (err) {
    console.log('err', err)
    yield transaction.rollback()
    throw err
  }

  this.body = yield getFullBikeshed({
    BikeshedId: this.state.bikeshed.id,
    user: this.state.user,
    models: this.models
  })
  this.status = 201
}

/**
 * Create bikeshed schema
 * Check validation on ctx.request.body
 */
BikeshedsController.create.schema = Joi.object().required().keys({
  files: Joi.object().min(2).max(5).required(),
  fields: Joi.object().default({}).keys({
    // @TODO: add maximum
    description: Joi.string().allow('').default('')
  })
})

/**
 * GET /api/bikesheds/:bikeshed
 */
BikeshedsController.show = function * show () {
  const bikeshed = yield getFullBikeshed({
    BikeshedId: this.params.bikeshed,
    user: this.state.user,
    models: this.models
  })

  this.assert(bikeshed, 404, 'Bikeshed not found')
  this.body = bikeshed
}

/**
 * POST /api/bikesheds/:bikeshed
 */
BikeshedsController.rate = function * rate () {
  const {Bike, Rating, Vote, sequelize} = this.models
  const {user, bikeshed, body} = this.state

  const ratings = _.indexBy(body.ratings, 'BikeId')

  const bikes = yield Bike.findAll({
    where: {
      BikeshedId: bikeshed.id
    }
  })

  // Do everything in a transaction
  const transaction = yield sequelize.transaction()
  try {
    // Create vote
    const vote = yield Vote.create({
      BikeshedId: bikeshed.id,
      UserId: user.id
    }, {
      transaction
    })

    // Create ratings
    yield Rating.bulkCreate(bikes.map(bike => {
      return {
        BikeId: bike.id,
        VoteId: vote.id,
        value: _.get(ratings, [bike.id, 'value'])
      }
    }, {
      transaction
    }))

    yield transaction.commit()
  } catch (err) {
    yield transaction.rollback()
    throw err
  }

  this.body = yield getFullBikeshed({
    BikeshedId: bikeshed.id,
    user: this.state.user,
    models: this.models
  })
  this.status = 201
}

/**
 * Rate bikeshed schema
 * Check validation on ctx.request.body
 */
BikeshedsController.rate.schema = Joi.object().required().keys({
  ratings: Joi.array().min(2).max(5).unique().required().items(
    Joi.object().required().keys({
      value: Joi.number().min(1).max(5).required(),
      BikeId: Joi.string().required()
    })
  )
})
