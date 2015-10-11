/**
 * Bikeshed model
 */
import Joi from 'joi'
import BaseModel from './model'

const FileListItemSchema = Joi.object()
.keys({
  fieldname: Joi.string(),
  originalname: Joi.string(),
  encoding: Joi.string(),
  mimetype: Joi.string(),
  size: Joi.number(),
  key: Joi.string()
})

const BikeshedSchema = Joi.object()
.keys({
  createdAt: Joi.date(),
  id: Joi.string().guid(),
  userId: Joi.string().guid().required(),
  requestId: Joi.string().guid().required(),
  description: Joi.string().max(4096).allow('').default('').optional(),
  fileList: Joi.array().min(2).max(8).items(FileListItemSchema).required()
})
.requiredKeys(['userId', 'requestId', 'fileList'])

const PROPS = {
  SCHEMA: BikeshedSchema,
  INDEXES: ['userId', 'createdAt'],
  TABLE: 'bikesheds',
  TYPE: 'Bikeshed'
}

export default class Bikeshed extends BaseModel {
}
Object.assign(Bikeshed.prototype, PROPS)
