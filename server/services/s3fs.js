/**
 * S3FS lets us interact with S3 as if we were using the fs module
 */
import S3FS from 's3fs'
import { aws } from '../../config'

// Export an S3FS singleton by default
export default createS3FS(aws)

// Create an S3FS instance
export function createS3FS ({ bucket, ...awsConfig }) {
  return new S3FS(bucket, awsConfig)
}
