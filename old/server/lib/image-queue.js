/**
 * Image Queue
 * Queue for image processing
 */
import S3FS from 's3fs'
import mime from 'mime'
import Queue from 'bull'
import sharp from 'sharp'
import pumpPromise from '@server/lib/pump-promise'

// Queue names
const APPLICATION = 'PROCESS_IMAGE_APPLICATION'
const WORKER = 'PROCESS_IMAGE_WORKER'

function getQueue (name, { port, host, ...other }) {
  return new Queue(name, port, host, other)
}

// Queue factory for the application
export function getApplicationImageQueue (redisConfig, models) {
  // Models
  const { Bikeshed } = models

  // Initialize queues
  const applicationQueue = getQueue(APPLICATION, redisConfig)
  const processImageQueue = getQueue(WORKER, redisConfig)
  return {
    addBikeshed ({ id, fileList, requestId, userId }) {
      return processImageQueue.add({
        bikeshedId: id,
        fileList,
        requestId,
        userId
      }, {
        attempts: 5,
        backoff: {
          type: 'exponential'
        }
      })
    },

    start () {
      // Start processing application jobs
      applicationQueue.process(10, processApplication)
    },

    queues: {
      WORKER: processImageQueue,
      APPLICATION: applicationQueue
    }
  }

  async function processApplication (job) {
    const { bikeshedId, status, payload } = job.data
    try {
      await Bikeshed.updateStatus(bikeshedId, status, payload)
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }
}

// Queue factory for the worker
export function getWorkerImageQueue (redisConfig, { bucket, ...awsConfig }) {
  // Initialize queues and s3fs
  const applicationQueue = getQueue(APPLICATION, redisConfig)
  const processImageQueue = getQueue(WORKER, redisConfig)
  const s3fs = new S3FS(bucket, awsConfig)

  function applicationStatusUpdate (status) {
    return (job, payload) => {
      if (status === 'processing') {
        payload = null
      }

      const { bikeshedId } = job.data
      applicationQueue.add({
        bikeshedId: bikeshedId,
        payload: payload,
        status: status
      }, {
        attempts: 5,
        backoff: {
          type: 'exponential'
        }
      })
    }
  }

  return {
    start () {
      // Setup event handlers and start processing image jobs
      processImageQueue
      .on('active', applicationStatusUpdate('processing'))
      .on('failed', applicationStatusUpdate('error'))
      .on('completed', applicationStatusUpdate('ready'))
      .process(10, processImage)
    },

    queues: {
      WORKER: processImageQueue,
      APPLICATION: applicationQueue
    }
  }

  async function processImage (job) {
    const { bikeshedId, fileList, userId } = job.data
    const metadataCollector = createMetadataCollector(s3fs)
    const streamList = fileList.reduce((result, file, idx) => {
      const extension = mime.extension(file.mimetype)
      const name = `${userId}/${bikeshedId}/${file.fieldname}`
      return [...result,
        metadataCollector.getMetadataPromise(idx, file.key),
        pumpPromise([
          s3fs.createReadStream(file.key),
          sharp().toFormat(extension),
          s3fs.createWriteStream(`${name}.full.${extension}`)
        ]),
        pumpPromise([
          s3fs.createReadStream(file.key),
          sharp().resize(320, 320).max().withoutEnlargement().toFormat(extension),
          s3fs.createWriteStream(`${name}.thumbnail.${extension}`)
        ])
      ]
    }, [])

    await Promise.all(streamList)
    return metadataCollector.getMetadataList()
  }
}

function createMetadataCollector (s3fs) {
  const metadataList = []
  return {
    getMetadataPromise (idx, fileKey) {
      return new Promise((resolve, reject) => {
        const readStream = s3fs.createReadStream(fileKey)
        readStream.on('error', reject)

        readStream.pipe(sharp().metadata(metadataCallback))
        function metadataCallback (err, metadata) {
          if (err) {
            reject(err)
          } else {
            const { width, height } = metadata
            const ratio = width / height
            metadataList[idx] = { width, height, ratio }
            resolve()
          }
        }
      })
    },
    getMetadataList () {
      return metadataList
    }
  }
}
