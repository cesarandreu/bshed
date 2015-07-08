import './BikeshedBuilder.less'
import Immutable from 'immutable'
import Paper from '../common/Paper'
import React, { PropTypes } from 'react'
import TextField from '../common/TextField'
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
 * BikeshedBuilderItemPlaceholder
 * @TODO
 */
export const BikeshedBuilderItemPlaceholder = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  propTypes: {
    imageCount: PropTypes.number.isRequired
  },

  render () {
    const { imageCount } = this.props

    if (imageCount >= ApplicationConstants.MAXIMUM_IMAGE_COUNT) {
      return null
    }

    return (
      <GridItem>
        THIS IS MY PLACEHOLDER~

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
 * @TODO
 */
export const BikeshedBuilderItem = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    image: PropTypes.instanceOf(BikeshedBuilderImage).isRequired
  },

  render () {
    <GridItem>
      THIS IS MY IMAGE~
    </GridItem>
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
        {images.map((image, key) => {
          <BikeshedBuilderItem
            image={image}
            key={key}
          />
        }).toArray()}

        <BikeshedBuilderItemPlaceholder
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
          disabled={imageCount < 2}
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
 * BikeshedBuilderForm
 */
export const BikeshedBuilderForm = React.createClass({
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
      <Paper className='bikeshed-builder-form'>
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
      <RegularView>
        BIKESHED BUILDERRRR~
        <BikeshedBuilderForm
          description={state.description}
          images={state.images}
        />
      </RegularView>
    )
  }
})

BikeshedBuilder = connectToStores(BikeshedBuilder, [BikeshedBuilderStore], context => {
  return {
    state: context.getStore(BikeshedBuilderStore).getState()
  }
})

export default BikeshedBuilder
