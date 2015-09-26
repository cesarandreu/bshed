/**
 * AWS configuration
 * @flow
 */
import { Endpoint } from 'aws-sdk'

export const development = {
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY',
  s3ForcePathStyle: true,
  region: 'us-west-1',
  endpoint: new Endpoint('http://localhost:10001')
}

export const test = {
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY',
  s3ForcePathStyle: true,
  region: 'us-west-1',
  endpoint: new Endpoint('http://localhost:10001')
}

export const production = {
  accessKeyId: '',
  secretAccessKey: '',
  s3ForcePathStyle: true,
  region: 'us-west-1',
  endpoint: new Endpoint('http://localhost:10001')
}
