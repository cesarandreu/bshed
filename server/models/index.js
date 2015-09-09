/**
 * Model loader
 * @flow
 */
import ssaclAttributeRoles from 'ssacl-attribute-roles'
import Sequelize from 'sequelize'
import debug from 'debug'

const log = debug('app:server:models')

/**
 * List of models to load
 */
export const MODEL_LIST = [
  'bike',
  'bikeshed',
  'rating',
  'user',
  'vote'
]

/**
 * Initialize, import, and associate models
 * Takes Sequelize configuration as a param
 * Returns all models as well as the Sequelize class and instance
 */
export default function modelLoader ({ database, username, password, ...config }: Object): Object {
  log('start')

  // Extract configs and initialize Sequelize
  // const { database, username, password } = config
  const sequelize = new Sequelize(database, username, password, config)

  // Attribute whitelisting/blacklisting with roles
  ssaclAttributeRoles(sequelize)

  // Load all the models
  const models = MODEL_LIST.reduce((models, name) => {
    log(`loading ${name} model`)
    const model = require(`./${name}.js`)(sequelize, Sequelize)
    models[model.name] = model
    return models
  }, {
    sequelize,
    Sequelize
  })

  // Associate models
  Object.keys(models).forEach(name => {
    if (models[name].associate) {
      log(`associate ${name}`)
      models[name].associate(models)
    }
  })

  log('end')
  return models
}
