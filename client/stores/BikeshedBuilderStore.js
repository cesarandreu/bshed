const createImmutableStore = require('../lib/createImmutableStore')
import Immutable from 'immutable'
const MAXIMUM_BIKE_COUNT = 5

const BikeshedBuilderStore = createImmutableStore({
  storeName: 'BikeshedBuilderStore',

  handlers: {
    BIKESHED_BUILDER_RESET: '_reset',

    BIKESHED_BUILDER_SUBMIT_START: '_submitStart',
    BIKESHED_BUILDER_SUBMIT_ERROR: '_submitError',

    BIKESHED_BUILDER_ADD: '_addImages',
    BIKESHED_BUILDER_REMOVE: '_removeImage',
    BIKESHED_BUILDER_PREVIEW: '_preview',
    BIKESHED_BUILDER_FORM_CHANGE: '_formChange'
  },

  cleanState () {
    return Immutable.fromJS({
      submitting: false,
      preview: '',
      form: {
        images: Immutable.OrderedMap(),
        description: ''
      }
    })
  },

  initialize () {
    this._state = this.cleanState()
  },

  getPreview () {
    return this._state.get('preview')
  },

  getForm () {
    return this._state.get('form')
  },

  getFormData () {
    const FormData = global.FormData
    const body = new FormData()
    const form = this.getForm()
    form.get('images').forEach(image => {
      body.append(image.get('name'), image.get('_file'))
    })
    body.append('description', form.get('description'))
    return body
  },

  /**
   * Revoke any image URLs and reset builder state
   */
  _reset () {
    const URL = global.URL
    this._state.getIn(['form', 'images']).forEach(image => {
      URL.revokeObjectURL(image.get('url'))
    })
    this.setState(this.cleanState())
  },

  /**
   * Form is submitting
   */
  _submitStart () {
    this.mergeState({
      submitting: true
    })
  },

  /**
   * Form is not submitting
   */
  _submitError () {
    this.setState({
      submitting: false
    })
  },

  /**
   * Add images to list
   * Fails with file of same name
   * Fails when count is over limit
   * @param {Array<Object>} images[]
   * @param {File} images[].file
   * @param {Object} images[].size
   * @param {number} images[].size.width
   * @param {number} images[].size.height
   */
  _addImages (images) {
    const URL = global.URL
    const state = this._state
    const imageList = state.getIn(['form', 'images'])

    const resultingImageList = imageList.withMutations(imageList => {
      images.forEach(image => {
        const hasValidCount = imageList.count() < MAXIMUM_BIKE_COUNT
        const imageNameTaken = imageList.has(image.file.name)
        if (!imageNameTaken && hasValidCount) {
          const imageItem = Immutable.Map({
            url: URL.createObjectURL(image.file),
            size: Immutable.Map(image.size),
            name: image.file.name,
            _file: image.file
          })

          imageList.set(image.file.name, imageItem)
        }
      })
    })

    this.setState(state.setIn(['form', 'images'], resultingImageList))
  },

  /**
   * Remove image from list
   * @param {string} name Image to remove
   */
  _removeImage (name) {
    const URL = global.URL
    const state = this._state
    const imageUrl = state.getIn(['form', 'images', name, 'url'])
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
      this.setState(state.deleteIn(['form', 'images', name]))
    }
  },

  /**
   * Receive form updates
   * @param {Object} update
   * @param {string} update.name Form field name
   * @param {string} update.value Form field value
   */
  _formChange ({name, value}={}) {
    const state = this._state
    this.setState(state.setIn(['form', name], value))
  },

  /**
   * Update image preview
   * Cleared if image isn't found
   * @param {string} name Image to preview
   */
  _preview (name) {
    const state = this._state
    const hasImage = state.hasIn(['form', 'images', name])
    this.mergeState({
      preview: hasImage ? name : ''
    })
  }
})

module.exports = BikeshedBuilderStore
