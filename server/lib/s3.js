/**
 * S3
 * @flow
 */
import { S3 } from 'aws-sdk'

// Create s3 client instance
export default function s3Loader (config: Object): S3 {
  return new S3(config)
}
