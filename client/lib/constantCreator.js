/**
 * Constant creator
 * @flow
 */

/**
 * Like keymirror, but adds name as a value prefix
 * @param {string} name Constant name prefix
 * @param {Object} constants Object of constants
 * @returns {Object} Constants object
 */
export default function constantCreator (name: string, constants: Object) {
  name = name.toUpperCase()

  return Object.keys(constants).reduce((constants, constant) => {
    constant = constant.toUpperCase()
    constants[constant] = `${name}_${constant}`
    return constants
  }, {})
}
