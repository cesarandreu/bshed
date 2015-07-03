/**
 * Like keymirror, but adds name as a prefix
 */
export default function constantCreator (name='', constants) {
  name = name.toUpperCase()

  return Object.keys(constants).reduce((constants, constant) => {
    constant = constant.toUpperCase()
    constants[constant] = `${name}_${constant}`
    return constants
  }, {})
}
