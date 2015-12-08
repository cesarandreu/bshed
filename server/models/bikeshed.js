/**
 * Bikeshed model
 */
import createModel from './model'
import Joi from 'joi'

const BikeshedBase = {
  INDEXES: {
    createdAt: 'createdAt',
    userId: 'userId'
  },

  SCHEMA: Joi.object({
    createdAt: Joi.date(),
    id: Joi.string().guid(),
    info: Joi.string().allow('').default(''),
    fileList: Joi.array().length(2).items(Joi.object({
      encoding: Joi.string(),
      fieldname: Joi.string(),
      key: Joi.string(),
      mimetype: Joi.string(),
      originalname: Joi.string(),
      size: Joi.number(),
      extension: Joi.string(),
      outputLocation: Joi.string(),
      outputName: Joi.string(),
      uploadLocation: Joi.string()
    }).required()).required(),
    requestId: Joi.string().guid().required(),
    status: Joi.string()
      .default('queued')
      .only('queued')
      .only('processing')
      .only('error')
      .only('ready'),
    title: Joi.string().max(4096).required(),
    updatedAt: Joi.date(),
    userId: Joi.string().guid().required()
  }),

  TABLE: 'bikesheds',

  TYPE: 'Bikeshed'
}

export default function createBikeshed ({ r, redlock }) {
  const BaseModel = createModel({ r }, BikeshedBase)
  const Bikeshed = Object.create(BaseModel, {
  })
  return Bikeshed
}

Object.assign(createBikeshed, BikeshedBase)
