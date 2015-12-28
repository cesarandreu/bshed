/**
 * Shared client and server constants
 */

// Valid bike image mimetypes
export const ALLOWED_MIMETYPES = [
  'image/jpeg',
  'image/png'
]

// Maximum number of bikes in a bikeshed
export const MAXIMUM_IMAGE_COUNT = 6
export const MINIMUM_IMAGE_COUNT = 2

// Maximum size per image: 3MB
export const MAXIMUM_IMAGE_SIZE = 3e6

// Valid bikeshed statuses
export const BIKESHED_STATUS = {
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
  PROCESSING: 'PROCESSING',
  QUEUED: 'QUEUED'
}
