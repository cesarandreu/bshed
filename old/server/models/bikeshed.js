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
  info: Joi.string().allow('').default('').optional(),
  description: Joi.string().max(4096).allow('').default('').optional(),
  fileList: Joi.array().min(2).max(8).items(FileListItemSchema).required(),
  status: Joi.string()
    .default('queued')
    .only('queued')
    .only('processing')
    .only('error')
    .only('ready')
    .optional()
})
.requiredKeys(['userId', 'requestId', 'fileList'])

const PROPS = {
  SCHEMA: BikeshedSchema,
  INDEXES: ['userId', 'createdAt'],
  TABLE: 'bikesheds',
  TYPE: 'Bikeshed'
}

export default class Bikeshed extends BaseModel {
  async updateStatus (bikeshedId: string, nextStatus: string, payload: any) {
    const resource = `locks:bikeshed:${bikeshedId}`
    const lock = await this.redlock.lock(resource, 1e3)
    try {
      const bikeshed = await this.get(bikeshedId)
      const nextFields = { status: nextStatus }
      if (nextStatus === 'ready' && Array.isArray(payload)) {
        nextFields.fileList = bikeshed.fileList.map((file, idx) =>
          ({ ...file, ...payload[idx] })
        )
      } else if (nextStatus === 'error' && payload) {
        nextFields.info = payload
      }
      await this.get(bikeshedId).update(nextFields)
    } finally {
      await lock.unlock()
    }
  }
}
Object.assign(Bikeshed.prototype, PROPS)
