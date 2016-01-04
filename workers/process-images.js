/**
 * Process uploaded images
 * Responsible for processing a bikeshed's images
 */
import Rx from 'rx'
import Joi from 'joi'
import pump from 'pump'
import sharp from 'sharp'
import debug from 'debug'
import { createJobStream } from './helpers'
import { pushImageUpdate } from './image-updates'
import { BIKESHED_STATUS } from 'bshed-constants'

const log = debug('worker:processImages')
const pump$ = Rx.Observable.fromNodeCallback(pump)

export function initialize ({ imageUpdatesQueue, processImageQueue, s3fs }) {
  log('initializing')

  processImageQueue
    .on('error', error => log('queue error', error))

  const updateStream = createUpdateStream({ imageUpdatesQueue, processImageQueue })
  updateStream.subscribe()

  const jobStream = createJobProcessorStream({ processImageQueue, s3fs })
  jobStream.subscribe()

  log('ready')
}

// Matches a queue event to a corresponding bikeshed status
function getBikeshedStatus (event) {
  switch (event) {
    case 'active':
      return BIKESHED_STATUS.PROCESSING
    case 'completed':
      return BIKESHED_STATUS.ACTIVE
    case 'failed':
      return BIKESHED_STATUS.ERROR
  }
}

// Image processor update stream
// @TODO: Handle progress updates?
export function createUpdateStream ({ imageUpdatesQueue, processImageQueue }) {
  log('creating job update stream')

  const streams = ['active', 'completed', 'failed'].map(event =>
    Rx.Observable.fromEvent(processImageQueue, event, (job, payload) => ({
      error: event === 'failed' ? payload : null,
      job: job,
      result: event === 'completed' ? payload : null,
      status: getBikeshedStatus(event)
    }))
  )

  return Rx.Observable.merge(streams)
    .tap(({ job, status }) => {
      log(`update status=${status} jobId=${job.jobId}`)
    })
    .flatMap(({ error, job, result, status }) => {
      return pushImageUpdate(imageUpdatesQueue, {
        data: job.data,
        error: error,
        result: result,
        status: status
      })
    })
}

// Creates a job stream and processes each image
export function createJobProcessorStream ({ processImageQueue, s3fs }) {
  log('creating job processor stream')

  return createJobStream(processImageQueue)
  .flatMap(({ job, done }) => {
    const { data, jobId } = job
    log(`processing jobId=${jobId}`)

    return Rx.Observable
      .from(data.files)
      .flatMap(file => imageMapper({ file, s3fs }))
      .doOnNext(value => {
        log(`progress jobId=${jobId} field=${value.file.field}`)
        job.progress(value)
      })
      .reduce((result, value) => [...result, value], [])
      .doOnNext((result) => {
        log(`completed jobId=${jobId}`)
        done(null, result)
      })
      .doOnError(error => {
        log(`error jobId=${jobId}`, error)
        done(error)
      })
  })
}

// Image mapper
// Reads the image metadata
// Creates a thumbnail version of the image
// Copies full image to output with stripped metadata
export function imageMapper ({ s3fs, file }) {
  const { extension, field, outputLocation, uploadLocation } = file
  function getOutput (size) {
    return `${outputLocation}/${field}/${size}.${extension}`
  }

  // Shared image pipeline
  // Receives the image stream and passes it to each clone
  const imagePipeline = sharp()

  // Thumbnail image
  // Tries resizing it to 320x320
  // Maintains the aspect ratio and doesn't enlarge the image
  const imageThumbnail$ = pump$([
    imagePipeline.clone()
      .resize(320, 320)
      .max()
      .withoutEnlargement()
      .toFormat(extension),
    s3fs.createWriteStream(getOutput('thumbnail'))
  ])

  // Full image
  // Strips image metadata
  const imageFull$ = pump$([
    imagePipeline.clone()
      .toFormat(extension),
    s3fs.createWriteStream(getOutput('full'))
  ])

  // Image metadata
  // Read the image metadata
  const imageMetadata$ = Rx.Observable.fromPromise(
    imagePipeline.clone()
      .metadata()
  )

  // Read stream of the uploaded image on s3
  // This stream gets passed to the shared image pipeline
  const imagePipeline$ = pump$([
    s3fs.createReadStream(uploadLocation),
    imagePipeline
  ])

  // Wait for every stream to finish
  // Pass the metadata along
  return Rx.Observable.forkJoin([
    imageMetadata$,
    imageThumbnail$,
    imageFull$,
    imagePipeline$
  ], ({ height, width }) => {
    return { height, width, file }
  })
}

const ADD_BIKESHED_SCHEMA = Joi.object({
  bikeshedId: Joi.string().guid().required(),
  files: Joi.array().items(Joi.object({
    extension: Joi.string().required(),
    field: Joi.string().required(),
    outputLocation: Joi.string().required(),
    uploadLocation: Joi.string().required()
  })).required(),
  requestId: Joi.string().guid().required(),
  userId: Joi.string().guid().required()
})

// Add a bikeshed's data to the queue
export function addBikeshed (processImageQueue, queueData) {
  Joi.assert(queueData, ADD_BIKESHED_SCHEMA)
  return processImageQueue.add(queueData, {
    attempts: 5,
    backoff: {
      type: 'exponential'
    }
  })
}
