import BikeshedBuilderConstants from '../constants/BikeshedBuilderConstants'
import ApplicationConstants from '../constants/ApplicationConstants'
import ImmutableStore from '../lib/ImmutableStore'
import Immutable from 'immutable'

// @TODO: update this to work with a few older browsers
const { FormData, File, URL } = global

export const BikeshedBuilderImage = Immutable.Record({
  height: null,
  width: null,
  name: null,
  file: null,
  url: null
}, 'BikeshedBuilderImage')

export const BikeshedBuilderState = Immutable.Record({
  images: Immutable.OrderedMap(),
  submitting: false,
  description: '',
  preview: ''
}, 'BikeshedBuilderState')

export default class BikeshedBuilderStore extends ImmutableStore {
  static storeName = 'BikeshedBuilderStore'

  static handlers = {
    [BikeshedBuilderConstants.RESET]: '_reset',
    [BikeshedBuilderConstants.ERROR]: '_error',
    [BikeshedBuilderConstants.SUBMIT]: '_submit',
    [BikeshedBuilderConstants.PREVIEW]: '_preview',
    [BikeshedBuilderConstants.ADD_IMAGES]: '_addImages',
    [BikeshedBuilderConstants.REMOVE_IMAGE]: '_removeImage',
    [BikeshedBuilderConstants.INPUT_CHANGE]: '_inputChange'
  }

  constructor (dispatcher: Object): void {
    super(dispatcher)
    this._state = new BikeshedBuilderState()
  }

  /**
   * Public methods
   */
  getPreview (): string {
    return this._state.get('preview')
  }

  getFormData (): FormData {
    const state = this.getState()
    const body = state.get('images').reduce((body, image) => {
      body.append(image.get('name'), image.get('file'))
      return body
    }, new FormData())
    body.append('description', state.get('description'))
    return body
  }

  /**
   * Quasi-private methods
   */
  _reset (): void {
    this._state.get('images').forEach(image =>
      URL.revokeObjectURL(image.get('url'))
    )
    this.setState(new BikeshedBuilderState())
  }

  _error (): void {
    this.mergeState({
      submitting: false
    })
  }

  _submit (): void {
    this.mergeState({
      submitting: true
    })
  }

  _preview (name: string): void {
    const state = this.getState()
    const preview = state.hasIn(['images', name], '')
    this.mergeState({ preview })
  }

  _addImages (imageList: BikeshedBuilderAddImages): void {
    const state = this.getState()
    const images = state.get('images')

    const resultingImages = images.withMutations(images => {
      return imageList.reduce((images, imageItem) => {
        // Extract image attributes
        const { width, height, file } = imageItem
        const { name } = file

        // Check if preconditions are met
        const hasValidCount = images.count() < ApplicationConstants.MAXIMUM_IMAGE_COUNT
        const imageNameTaken = images.has(name)
        if (!imageNameTaken && hasValidCount) {

          // Create Record instance and set it
          imageItem = new BikeshedBuilderImage({
            url: URL.createObjectURL(file),
            height,
            width,
            name,
            file
          })

          // Set it on the ordered map
          images.set(name, imageItem)
        }
        return images
      }, images)
    })

    this.mergeState({ images: resultingImages })
  }

  _removeImage (name: string): void {
    const state = this.getState()
    const images = state.get('images')
    if (images.has(name)) {
      URL.revokeObjectURL(images.getIn([name, 'url']))
      this.mergeState({
        images: images.remove(name)
      })
    }
  }

  _inputChange (input: FormInput): void {
    const { name, value } = input
    this.mergeState({
      [name]: value
    })
  }
}

// Types
type BikeshedBuilderImageObject = {
  height: number;
  width: number;
  file: File;
};

type FormInput = {
  value: string;
  name: string;
};

type BikeshedBuilderAddImages = Array<BikeshedBuilderImageObject>;
