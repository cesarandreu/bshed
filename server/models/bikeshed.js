/**
 * Bikeshed model
 */
import Joi from 'joi'
import * as utils from './utils'

export const INDEXES = ['userId', 'createdAt']
export const TABLE = 'bikesheds'
export const TYPE = 'Bikeshed'

export const FileListItemSchema = Joi.object().keys({
  fieldname: Joi.string(),
  originalname: Joi.string(),
  encoding: Joi.string(),
  mimetype: Joi.string(),
  size: Joi.number(),
  key: Joi.string()
})

export const BikeshedSchema = Joi.object().keys({
  createdAt: Joi.date(),
  id: Joi.string().guid(),
  userId: Joi.string().guid(),
  requestId: Joi.string().guid(),
  fileList: Joi.array().min(2).max(8).items(FileListItemSchema),
  description: Joi.string().max(4096).allow('').default('').optional()
})

export const validate = utils.createValidate(BikeshedSchema)

export const get = utils.createGet(TABLE)

export async function create (r, values) {
  const bikeshedValues = validate(values)

  const { generated_keys: [bikeshedId] } = await r.table(TABLE).insert({
    createdAt: r.now(),
    ...bikeshedValues
  })
  return bikeshedId
}
