/**
 * Browser APIs
 * Used in order for browser dependencies to be easily stubbed in tests
 * @flow
 */

/**
 * matchMedia
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
 */
export const matchMedia = global.matchMedia

/**
 * FormData
 */
export const FormData = global.FormData

/**
 * FileList
 */
export const FileList = global.FileList

/**
 * File
 */
export const File = global.File
