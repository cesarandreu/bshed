import './BikeshedBuilder.less'

import cn from 'classnames'
import Immutable from 'immutable'
import Grid from '../common/Grid'
import Paper from '../common/Paper'
import React, { PropTypes } from 'react'
import GridItem from '../common/GridItem'
import TextField from '../common/TextField'
import BaseButton from '../common/BaseButton'
import RegularView from '../common/RegularView'
import ActionMixin from '../../lib/ActionMixin'
import RaisedButton from '../common/RaisedButton'
import { connectToStores } from 'fluxible-addons-react'
import ImmutableRenderMixin from 'react-immutable-render-mixin'
import ApplicationConstants from '../../constants/ApplicationConstants'
import * as BikeshedBuilderActions from '../../actions/BikeshedBuilderActions'
import BikeshedBuilderStore, {
  BikeshedBuilderState,
  BikeshedBuilderImage
} from '../../stores/BikeshedBuilderStore'

/**
 * BikeshedBuilderDescription
 */
export const BikeshedBuilderDescription = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  propTypes: {
    description: PropTypes.string.isRequired
  },

  render () {
    const { description } = this.props

    return (
      <TextField
        name='description'
        value={description}
        onChange={this.inputChange}
        label='Bikeshed description'
        className='bikeshed-builder-description'
      />
    )
  },

  inputChange (e) {
    this.executeAction(BikeshedBuilderActions.inputChange, {
      value: e.target.value,
      name: e.target.name
    })
  }
})

/**
 * BikeshedBuilderPlaceholder
 */
export const BikeshedBuilderPlaceholder = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  propTypes: {
    imageCount: PropTypes.number.isRequired
  },

  statics: {
    getText (imageCount) {
      const missing = ApplicationConstants.MINIMUM_IMAGE_COUNT - imageCount
      return missing === 1 ? '1 image' : `${missing} images`
    }
  },

  render () {
    const { imageCount } = this.props

    if (imageCount >= ApplicationConstants.MAXIMUM_IMAGE_COUNT) {
      return null
    }

    return (
      <GridItem className='bikeshed-builder-placeholder'>
        <BaseButton
          className='bikeshed-builder-placeholder-button'
          onClick={this.selectImages}
        >
          <svg
            className='bikeshed-builder-placeholder-icon'
            viewBox='0 0 24 24'
            height='48'
            width='48'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/>
            <path d='M0 0h24v24H0z' fill='none'/>
          </svg>

          {imageCount < ApplicationConstants.MINIMUM_IMAGE_COUNT && (
            <div className='bikeshed-builder-placeholder-text'>
              {`Add ${BikeshedBuilderPlaceholder.getText(imageCount)}`}
            </div>
          )}
        </BaseButton>

        <input
          type='file'
          multiple={true}
          ref='imageInput'
          onChange={this.addImages}
          style={{display: 'none'}}
          accept='image/jpeg,image/png'
        />
      </GridItem>
    )
  },

  selectImages (e) {
    this.refs.imageInput.getDOMNode().click()
    e.preventDefault()
  },

  addImages (e) {
    this.executeAction(BikeshedBuilderActions.addImages, e.target.files)
  }
})

/**
 * BikeshedBuilderItem
 */
export const BikeshedBuilderItem = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    image: PropTypes.instanceOf(BikeshedBuilderImage).isRequired
  },

  statics: {
    getImageClassNames ({ height, width }) {
      const size = ApplicationConstants.BIKESHED_BUILDER_IMAGE_SIZE

      return cn('bikeshed-builder-item', {
        'bikeshed-builder-item-small': width < size || height < size,
        'bikeshed-builder-item-wider': width > height,
        'bikeshed-builder-item-longer': height > width,
        'bikeshed-builder-item-square': height === width
      })
    }
  },

  render () {
    const { image } = this.props

    const size = {
      width: image.get('width'),
      height: image.get('height')
    }

    return (
      <GridItem className={BikeshedBuilderItem.getImageClassNames(size)}>
        <img
          className='bikeshed-builder-item-image'
          src={image.get('url')}
        />
      </GridItem>
    )
  },

  preview () {
    const { image } = this.props
    this.executeAction(BikeshedBuilderActions.preview, image.get('name'))
  },

  removeImage () {
    const { image } = this.props
    this.executeAction(BikeshedBuilderActions.removeImage, image.get('name'))
  }
})

export const BikeshedBuilderGrid = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    images: PropTypes.instanceOf(Immutable.OrderedMap).isRequired
  },

  render () {
    const { images } = this.props

    return (
      <Grid className='bikeshed-builder-grid'>
        {images.map((image, key) =>
          <BikeshedBuilderItem
            image={image}
            key={key}
          />
        ).toArray()}

        <BikeshedBuilderPlaceholder
          imageCount={images.count()}
        />
      </Grid>
    )
  }
})

/**
 * BikeshedBuilderContent
 */
export const BikeshedBuilderContent = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    description: PropTypes.string.isRequired,
    images: PropTypes.instanceOf(Immutable.OrderedMap).isRequired
  },

  render () {
    const { description, images } = this.props

    return (
      <div className='bikeshed-builder-content'>
        <BikeshedBuilderDescription
          description={description}
        />
        <BikeshedBuilderGrid
          images={images}
        />
      </div>
    )
  }
})

/**
 * BikeshedBuilderButtons
 */
export const BikeshedBuilderButtons = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  propTypes: {
    imageCount: PropTypes.number.isRequired
  },

  render () {
    const { imageCount } = this.props

    return (
      <div className='bikeshed-builder-buttons'>
        <RaisedButton
          label='Save'
          secondary={true}
          onClick={this.submit}
          disabled={imageCount < ApplicationConstants.MINIMUM_IMAGE_COUNT}
          className='bikeshed-builder-save-button'
        />
      </div>
    )
  },

  submit () {
    this.executeAction(BikeshedBuilderActions.submit)
  }
})

/**
 * BikeshedBuilderPaper
 */
export const BikeshedBuilderPaper = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    description: PropTypes.string.isRequired,
    images: PropTypes.instanceOf(Immutable.OrderedMap).isRequired
  },

  render () {
    const { description, images } = this.props

    return (
      <Paper className='bikeshed-builder-paper'>
        <BikeshedBuilderContent
          description={description}
          images={images}
        />
        <BikeshedBuilderButtons
          imageCount={images.count()}
        />
      </Paper>
    )
  }
})

/**
 * BikeshedBuilder
 */
export let BikeshedBuilder = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  statics: {
    navigateAction: BikeshedBuilderActions.navigateAction
  },

  propTypes: {
    state: PropTypes.instanceOf(BikeshedBuilderState).isRequired
  },

  render () {
    const { state } = this.props

    return (
      <RegularView className='bikeshed-builder'>
        <BikeshedBuilderPaper
          description={state.description}
          images={state.images}
        />
      </RegularView>
    )
  }
})

BikeshedBuilder = connectToStores(BikeshedBuilder, [BikeshedBuilderStore], context => {
  console.log('context.getStore(BikeshedBuilderStore).getState()', JSON.stringify(context.getStore(BikeshedBuilderStore).getState().toJSON()))
  return {
    state: context.getStore(BikeshedBuilderStore).getState()
  }
})

export default BikeshedBuilder
