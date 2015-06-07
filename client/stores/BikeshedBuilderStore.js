const createImmutableStore = require('../lib/createImmutableStore')
const Immutable = require('immutable')

const BikeshedBuilderStore = createImmutableStore({
  storeName: 'BikeshedBuilderStore',

  handlers: {
    BIKESHED_BUILDER_RESET: '_reset',

    BIKESHED_BUILDER_SUBMIT_START: '_submitStart',
    BIKESHED_BUILDER_SUBMIT_ERROR: '_submitError',

    BIKESHED_BUILDER_ADD: '_add',
    BIKESHED_BUILDER_REMOVE: '_remove',
    BIKESHED_BUILDER_PREVIEW: '_preview',
    BIKESHED_BUILDER_FORM_CHANGE: '_formChange'
  },

  cleanState () {
    return Immutable.fromJS({
      bikes: Immutable.OrderedMap(),
      preview: '',
      form: {
        submitting: false,
        description: {
          error: '',
          value: ''
        }
      }
    })
  },

  initialize () {
    this._state = this.cleanState()
  },

  getPreview () {
    return this._state.get('preview', '')
  },

  getBikes () {
    return this._state.get('bikes')
  },

  getForm () {
    return this._state.get('form')
  },

  getPreviewState () {
    const preview = this._state.get('preview')
    return this._state.getIn(['bikes', preview], null)
  },

  getFormData () {
    const body = new FormData()

    this._state.get('bikes').forEach(bike => {
      const file = bike.get('_file')
      const name = bike.get('name')
      body.append(name, file)
    })

    const description = this._state.getIn(['form', 'description', 'value'], '')
    body.append('description', description)

    return body
  },

  _reset () {
    this._state.get('bikes').forEach(bike => {
      URL.revokeObjectURL(bike.get('url'))
    })
    this.setState(
      this.cleanState()
    )
  },

  _submitStart () {
    this.setState(
      this._state.setIn(['form', 'submitting'], true)
    )
  },

  _submitError (res) {
    this.setState(
      this._state.setIn(['form', 'submitting'], false)
    )
  },

  /**
   * Add image to list
   * Fails when count is over limit
   * Fails with file of pre-existing name
   * @param {Object} image
   * @param {File} image.file
   * @param {Object} image.size
   * @param {number} image.size.width
   * @param {number} image.size.height
   */
  _add (image) {
    const name = image.file.name
    const bikes = this._state.get('bikes')
    if (!bikes.has(name) && bikes.count() < 12)
      this.setState(
        this._state.setIn(
          ['bikes', name],
          generateBike(image)
        )
      )
  },

  /**
   * Remove image from list
   * @param {string} name Bike to remove
   */
   _remove (name) {
    if (this._state.hasIn(['bikes', name])) {
      URL.revokeObjectURL(
        this._state.getIn(['bikes', name, 'url'])
      )
      this.setState(
        this._state.deleteIn(['bikes', name])
      )
    }
   },

  /**
   * Receive form updates
   * @param {Object} update
   * @param {string} update.name Form field name
   * @param {string} update.value Form field value
   */
  _formChange (update) {
    this.setState(
      this._state.setIn(['form', update.name], Immutable.fromJS({
        value: update.value,
        error: ''
      }))
    )
  },

  /**
   * Updates bike preview
   * Cleared if bike isn't found
   * @param {string} name Bike to preview
   */
  _preview (name) {
    const hasBike = this._state.hasIn(['bikes', name])
    this.mergeState({
      preview: hasBike ? name : ''
    })
  }
})

module.exports = BikeshedBuilderStore

// HELPERS
function generateBike (image) {
  return Immutable
    .fromJS({
      url: URL.createObjectURL(image.file),
      name: image.file.name,
      size: image.size
    })
    .merge({
      _file: image.file
    })
}
