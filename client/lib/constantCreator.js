export default function constantCreator (name='', constants) {
  name = name.toUpperCase()

  return Object.keys(constants).reduce((constants, constant) => {
    constants[constant] = `${name}_${constant}`
    return constants
  }, constants)
}
