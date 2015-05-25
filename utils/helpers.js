const co = require('co')
const Joi = require('joi')
const _ = require('lodash')
const wait = require('co-wait')
const createError = require('http-errors')

/**
 * retry
 * ripped off from co-retry
 * Execute fn and retry on failure
 */
exports.retry = function* retry (fn, {attempts=3, interval=300, delta=150}={}) {
  while (true)
    try {
      return yield co(fn)
    } catch (err) {
      if (!(attempts--)) throw err
      yield wait(_.random(interval - delta, interval + delta))
    }
}

/**
 * Check schema for object
 * @param {Object} object Object to validate
 * @param {Object} schema Schema to use in validation
 * @returns {Proimise} Schema validation promise
 */
exports.checkSchema = function checkSchema (object, schema) {
  return new Promise((resolve, reject) => {
    Joi.validate(object, schema, (err, result) => {
      err ? reject(prepareError(err)) : resolve(result)
    })
  })

  function prepareError (err) {
    err.status = 422
    err.expose = true
    return createError(err)
  }
}
