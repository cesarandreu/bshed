/**
 * Image proxy
 * This will download the image and pipe it to the user
 * @TODO: Make this proxy requests to avoid downloading every image?
 */
import Joi from 'joi'

const imageProxyParamsSchema = Joi.object({
  bikeshedId: Joi.string().guid().required(),
  bikeKey: Joi.string().required(),
  size: Joi.string().regex(/^(full|thumbnail)\.(png|jpeg)$/).required()
})

export default function imageProxy ({ s3fs }) {
  return async function imageProxyMiddleware (ctx) {
    // Validate url params
    const { error, value } = imageProxyParamsSchema.validate(ctx.params)
    ctx.assert(!error, 404, error)

    // Get image path
    const imagePath = getImagePath(value)

    // Confirm the image exists
    const imageExists = await checkImageExistence(imagePath)
    ctx.assert(imageExists, 404, 'Image does not exist')

    // Use the file extension to set the type
    ctx.type = value.size.split('.').pop()

    // Stream the file to the user
    ctx.body = s3fs.createReadStream(imagePath)
  }

  function getImagePath ({ bikeshedId, bikeKey, size }) {
    return `bikesheds/${bikeshedId}/${bikeKey}/${size}`
  }

  function checkImageExistence (imagePath) {
    return new Promise(resolve => s3fs.exists(imagePath, resolve))
  }
}
