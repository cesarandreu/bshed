/**
 * AWS configuration
 * @flow
 */
import { Endpoint } from 'aws-sdk'

export const development = {
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY',
  apiVersion: '2015-09-09',
  s3ForcePathStyle: true,
  endpoint: new Endpoint('http://localhost:10001')
}

export const test = {
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY',
  apiVersion: '2015-09-09',
  s3ForcePathStyle: true,
  endpoint: new Endpoint('http://localhost:10001')
}

export const production = {
  accessKeyId: '',
  secretAccessKey: '',
  apiVersion: '2015-09-09',
  s3ForcePathStyle: true,
  endpoint: new Endpoint('http://localhost:10001')
}
