/**
 * AWS configuration
 */
import { Endpoint } from 'aws-sdk'

export const development = {
  bucket: 'bshed_development',
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY',
  s3ForcePathStyle: true,
  region: 'us-west-1',
  endpoint: new Endpoint('http://localhost:10001')
}

export const test = {
  bucket: 'bshed_test',
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY',
  s3ForcePathStyle: true,
  region: 'us-west-1',
  endpoint: new Endpoint('http://localhost:10001')
}

export const production = {
  bucket: 'bshed_production',
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY',
  s3ForcePathStyle: true,
  region: 'us-west-1',
  endpoint: new Endpoint('http://localhost:10001')
}
