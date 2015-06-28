const BikeshedBuilderStore = require('../stores/BikeshedBuilderStore')
const BikeshedApiUtils = require('../utils/BikeshedApiUtils')
const browserImageSize = require('browser-image-size')
const _ = require('lodash')

/**
 * Navigate action
 * Tell store to start with a clean slate
 */
exports.builderNavigateAction = function builderNavigateAction (context) {
  context.dispatch('BIKESHED_BUILDER_RESET')
}

/**
 * Add received files to list
 * @param {FileList} payload
 */
exports.add = async function add (context, payload) {
  const results = await Promise.all(
    Array.from(payload)
    .filter(file =>
      _.includes(['image/png', 'image/jpeg'], file.type)
    )
    .map(file =>
      browserImageSize(file)
        .then(size => {
          return {file, size}
        })
    )
  )
  context.dispatch('BIKESHED_BUILDER_ADD', results)
}

/**
 * Remove image from bikeshed builder list
 * @param {string} name
 */
exports.remove = function remove (context, name) {
  context.dispatch('BIKESHED_BUILDER_REMOVE', name)
}

/**
 * Notify a form field changed
 * @param {Object} payload
 * @param {string} payload.name Field name
 * @param {string} payload.value Field value
 */
exports.formChange = function formChange (context, payload) {
  context.dispatch('BIKESHED_BUILDER_FORM_CHANGE', payload)
}

/**
 * Set preview image
 * @param {string} name
 */
exports.preview = function preview (context, name) {
  context.dispatch('BIKESHED_BUILDER_PREVIEW', name)
}

/**
 * Create bikeshed
 */
exports.submit = async function submit (context) {
  try {
    context.dispatch('BIKESHED_BUILDER_SUBMIT_START')

    const body = context.getStore(BikeshedBuilderStore).getFormData()
    const result = await context.executeRequest(BikeshedApiUtils.createBikeshed, {body})
    context.dispatch('BIKESHED_INFO_RECEIVED', result.parsedBody)
    context.dispatch('BIKESHED_BUILDER_RESET')

    context.router.transitionTo('bikeshed', {
      bikeshedId: result.parsedBody.id
    })
  } catch (err) {
    context.dispatch('BIKESHED_BUILDER_SUBMIT_ERROR', err)
  }
}
