/**
 * Image Queue
 * Queue for image processing
 */
import kue from 'kue'
import S3FS from 's3fs'
import pump from 'pump'
import mime from 'mime'
import sharp from 'sharp'

export const JOB_TYPE = 'process-image-upload'
export const JOB_CONCURRENCY = 10

async function processJob (s3fs, job) {
  const { bikeshedId, fileList, userId } = job.data

  const streamList = fileList
  .reduce((result, file) => [...result, [
    // Full size image
    s3fs.createReadStream(file.key),
    sharp().toFormat(mime.extension(file.mimetype)),
    s3fs.createWriteStream(
      `${userId}/${bikeshedId}/${file.fieldname}.full.${mime.extension(file.mimetype)}`
    )
  ], [
    // Thumbnail size image
    s3fs.createReadStream(file.key),
    sharp().resize(320, 320).max().withoutEnlargement().toFormat(mime.extension(file.mimetype)),
    s3fs.createWriteStream(
      `${userId}/${bikeshedId}/${file.fieldname}.thumbnail.${mime.extension(file.mimetype)}`
    )
  ]], [])

  await Promise.all(streamList.map(streamList =>
    new Promise((resolve, reject) =>
      pump(streamList, err => err ? reject(err) : resolve())
    )
  ))
}

export function createJobConsumer (queueConfig, { bucket, ...awsConfig }) {
  const queue = kue.createQueue(queueConfig)
  const s3fs = new S3FS(bucket, awsConfig)
  queue.process(JOB_TYPE, JOB_CONCURRENCY, (job, done) => {
    console.log('Job start', job.data.bikeshedId)
    processJob(s3fs, job)
      .then(() => {
        console.log('Job finish', job.data.bikeshedId)
        done()
      })
      .catch((err) => {
        console.error('Job error', job.data.bikeshedId, err)
        done(err)
      })
  })
}

export function getJobCreator (queueConfig) {
  const queue = kue.createQueue(queueConfig)

  return function jobCreator ({ bikeshedId, fileList, requestId, userId }) {
    return queue
    .create(JOB_TYPE, {
      bikeshedId,
      fileList,
      requestId,
      userId
    })
    .attempts(5)
    .backoff({ type: 'exponential' })
    .save()
  }
}
