/**
 * S3
 * @flow
 */
import { S3 } from 'aws-sdk'

// Create s3 client instance
export default function s3Loader (config: Object): S3 {
  return new S3(config)
}

// Upload a file to S3
export function uploadFile (client: S3, uploadConfig: Object): Promise {
  return new Promise((resolve, reject) => {
    client.upload(uploadConfig, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

// Delete an object from S3
export function deleteObject (client: S3, deleteConfig: Object): Promise {
  return new Promise((resolve, reject) => {
    client.deleteObject(deleteConfig, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}
