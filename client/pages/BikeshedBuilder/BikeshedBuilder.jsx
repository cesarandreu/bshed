import './BikeshedBuilder.less'

import cn from 'classnames'
import { OrderedMap } from 'immutable'
import Grid from '../../components/Grid'
import Paper from '../../components/Paper'
import GridItem from '../../components/GridItem'
import TextField from '../../components/TextField'
import React, { Component, PropTypes } from 'react'
import BaseButton from '../../components/BaseButton'
import RegularView from '../../components/RegularView'
import RaisedButton from '../../components/RaisedButton'
import ApplicationConstants from '../../constants/ApplicationConstants'
import { BikeshedBuilderState, BikeshedBuilderImage } from '../../reducers/bikeshedBuilder'

/**
 * BikeshedBuilderDescription
 */
export class BikeshedBuilderDescription extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    inputChange: PropTypes.func.isRequired
  }

  render () {
    const { description } = this.props

    return (
      <TextField
        name='description'
        value={description}
        label='Bikeshed description'
        onChange={this.inputChange.bind(this)}
        className='bikeshed-builder-description'
      />
    )
  }

  inputChange (e) {
    const { name, value } = e.currentTarget // e.target
    this.props.inputChange({ name, value })
  }
}

/**
 * BikeshedBuilderPlaceholder
 */
export class BikeshedBuilderPlaceholder extends Component {
  static propTypes = {
    imageCount: PropTypes.number.isRequired,
    addImages: PropTypes.func.isRequired
  }

  static getText (imageCount: number) {
    const missing = ApplicationConstants.MINIMUM_IMAGE_COUNT - imageCount
    return missing === 1 ? '1 image' : `${missing} images`
  }

  render () {
    const { imageCount, addImages } = this.props
    if (imageCount >= ApplicationConstants.MAXIMUM_IMAGE_COUNT) {
      return null
    }

    return (
      <GridItem className='bikeshed-builder-placeholder'>
        <BaseButton
          className='bikeshed-builder-placeholder-button'
          onClick={this.selectImages.bind(this)}
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
          onChange={(e) => addImages(e.currentTarget.files /* e.target.files */)}
          style={{display: 'none'}}
          accept='image/jpeg,image/png'
        />
      </GridItem>
    )
  }

  selectImages (e) {
    this.refs.imageInput.click()
    e.preventDefault()
  }
}

/**
 * BikeshedBuilderItem
 */
export class BikeshedBuilderItem extends Component {
  static propTypes = {
    image: PropTypes.instanceOf(BikeshedBuilderImage).isRequired,
    removeImage: PropTypes.func.isRequired,
    preview: PropTypes.func.isRequired
  }

  static getImageClassNames ({ height, width }) {
    const size = ApplicationConstants.BIKESHED_BUILDER_IMAGE_SIZE

    return cn('bikeshed-builder-item', {
      'bikeshed-builder-item-small': width < size || height < size,
      'bikeshed-builder-item-wider': width > height,
      'bikeshed-builder-item-longer': height > width,
      'bikeshed-builder-item-square': height === width
    })
  }

  render () {
    const { image /*, removeImage, preview*/ } = this.props
    // console.log(removeImage, preview)

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
  }

  // preview () {
  //   const { image } = this.props
  //   this.executeAction(BikeshedBuilderActions.preview, image.get('name'))
  // }

  // removeImage () {
  //   const { image } = this.props
  //   this.executeAction(BikeshedBuilderActions.removeImage, image.get('name'))
  // }
}

/**
 * BikeshedBuilderGrid
 */
export class BikeshedBuilderGrid extends Component {
  static propTypes = {
    images: PropTypes.instanceOf(OrderedMap).isRequired,
    removeImage: PropTypes.func.isRequired,
    addImages: PropTypes.func.isRequired,
    preview: PropTypes.func.isRequired
  }

  render () {
    const { images, addImages, removeImage, preview } = this.props

    return (
      <Grid className='bikeshed-builder-grid'>
        {images.map((image, key) =>
          <BikeshedBuilderItem
            removeImage={removeImage}
            preview={preview}
            image={image}
            key={key}
          />
        ).toArray()}

        <BikeshedBuilderPlaceholder
          imageCount={images.count()}
          addImages={addImages}
        />
      </Grid>
    )
  }
}

/**
 * BikeshedBuilderContent
 */
export class BikeshedBuilderContent extends Component {
  static propTypes = {
    images: PropTypes.instanceOf(OrderedMap).isRequired,
    description: PropTypes.string.isRequired,
    inputChange: PropTypes.func.isRequired,
    removeImage: PropTypes.func.isRequired,
    addImages: PropTypes.func.isRequired,
    preview: PropTypes.func.isRequired
  }

  render () {
    const { description, images, inputChange, ...props } = this.props

    return (
      <div className='bikeshed-builder-content'>
        <BikeshedBuilderDescription
          description={description}
          inputChange={inputChange}
        />
        <BikeshedBuilderGrid
          images={images}
          { ...props }
        />
      </div>
    )
  }
}

/**
 * BikeshedBuilderButtons
 */
export class BikeshedBuilderButtons extends Component {
  static propTypes = {
    imageCount: PropTypes.number.isRequired,
    submit: PropTypes.func.isRequired
  }

  render () {
    const { imageCount, submit } = this.props

    return (
      <div className='bikeshed-builder-buttons'>
        <RaisedButton
          label='Save'
          secondary={true}
          onClick={submit}
          disabled={imageCount < ApplicationConstants.MINIMUM_IMAGE_COUNT}
          className='bikeshed-builder-save-button'
        />
      </div>
    )
  }
}

/**
 * BikeshedBuilderPaper
 */
export class BikeshedBuilderPaper extends Component {
  static propTypes = {
    images: PropTypes.instanceOf(OrderedMap).isRequired,
    description: PropTypes.string.isRequired,
    inputChange: PropTypes.func.isRequired,
    removeImage: PropTypes.func.isRequired,
    addImages: PropTypes.func.isRequired,
    preview: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
  }

  render () {
    const { description, images, submit, ...props } = this.props

    return (
      <Paper className='bikeshed-builder-paper'>
        <BikeshedBuilderContent
          description={description}
          images={images}
          { ...props }
        />
        <BikeshedBuilderButtons
          imageCount={images.count()}
          submit={submit}
        />
      </Paper>
    )
  }
}

/**
 * BikeshedBuilder
 */
export default class BikeshedBuilder extends Component {
  static propTypes = {
    bikeshedBuilder: PropTypes.instanceOf(BikeshedBuilderState).isRequired,
    inputChange: PropTypes.func.isRequired,
    removeImage: PropTypes.func.isRequired,
    addImages: PropTypes.func.isRequired,
    preview: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
  }

  render () {
    const { bikeshedBuilder, ...props } = this.props
    return (
      <RegularView className='bikeshed-builder'>
        <BikeshedBuilderPaper
          description={bikeshedBuilder.description}
          images={bikeshedBuilder.images}
          { ...props }
        />
      </RegularView>
    )
  }
}
