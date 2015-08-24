/**
 * Create constants
 * Like keymirror, but adds name as a value prefix
 * @flow
 */
export default function createConstants (name: string, constants: Object): Object {
  name = name.toUpperCase()

  return Object.keys(constants).reduce((constants, constant) => {
    constant = constant.toUpperCase()
    constants[constant] = `${name}_${constant}`
    return constants
  }, {})
}
