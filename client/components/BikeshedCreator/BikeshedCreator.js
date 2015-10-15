/**
 * BikeshedCreator
 * @flow
 */
import { CreateBikeshedMutation } from '@client/mutations/CreateBikeshedMutation'
import { createObjectURL, revokeObjectURL } from '@client/lib/URL'
import { Card, CardActions, CardBody } from '@components/Card'
import { getBikeshedViewerPath } from '@client/lib/RouteUtils'
import type { SyntheticEvent, ReactElement } from 'react'
import React, { Component, PropTypes } from 'react'
import { TextInput } from '@components/TextInput'
import { Icon, ICONS } from '@components/Icon'
import { Button } from '@components/Button'
import { Subhead } from '@components/Text'
import cn from './BikeshedCreator.css'
import Relay from 'react-relay'

const MAXIMUM_IMAGE_COUNT = 8

/**
 * BikeshedCreator page
 */
export class BikeshedCreator extends Component {
  constructor (props: Object) {
    super(props)
    this.state = {
      // Form
      description: '',
      files: [],

      // UI state
      saving: false
    }
    this._handleInput = this._handleInput.bind(this)
    this._handleFiles = this._handleFiles.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._addFileClick = this._addFileClick.bind(this)
    this._setSaving = this._setSaving.bind(this)
  }

  /**
   * Upload the files and create your bikeshed
   * If we're succesful we want to navigate to the new bikeshed
   * @TODO: Add toast message on failure
   */
  _handleSubmit () {
    const { _setSaving } = this
    const { viewer, history } = this.props
    const { description, files } = this.state

    _setSaving(true)
    Relay.Store.update(new CreateBikeshedMutation({ viewer, description, files }), {
      onFailure (transaction) {
        _setSaving(false)
        // console.log('transaction', transaction)
      },
      onSuccess ({ createBikeshed }) {
        _setSaving(false)

        // Navigate to the newly created bikeshed's page
        const bikeshedId = createBikeshed.bikeshedEdge.node.id
        history.pushState({}, getBikeshedViewerPath(bikeshedId))
      }
    })
  }

  _setSaving (saving: boolean) {
    this.setState({ saving })
  }

  _handleInput (e: SyntheticEvent) {
    const description = e.target.value
    this.setState({ description })
  }

  // @TODO: Consider adding a toast message for duplicate images
  _handleFiles (e: SyntheticEvent) {
    const { files } = this.state
    const remainingSpaces = MAXIMUM_IMAGE_COUNT - files.length
    const inputFiles = Array.from(e.target.files)
      .slice(0, remainingSpaces)
      .filter(file => !files.some(fileItem => fileItem.name === file.name))
      .map(file => {
        file.src = createObjectURL(file)
        return file
      })

    const nextFiles = [...files, ...inputFiles]
    this.setState({ files: nextFiles })
  }

  _removeFile (idx: number) {
    // Get a copy of files array that'll be modified below
    const files = this.state.files.slice()

    // Remove the deleted file and dispose its url
    const [file] = files.splice(idx, 1)
    revokeObjectURL(file.src)

    // Update the state with new files list
    this.setState({ files })
  }

  // Trigger a click on fileInput when Add Image is pressed
  _addFileClick () {
    this.refs.fileInput.click()
  }

  // Revoke all urls when we leave
  componentWillUnmount () {
    const { files } = this.state
    files.forEach(file => revokeObjectURL(file.src))
  }

  render (): ReactElement {
    const { description, files, saving } = this.state

    return (
      <div className={cn.page}>
        <Subhead className={cn.subhead}>
          Bikeshed Creator
        </Subhead>
        <Card>
          <CardBody>
            <TextInput
              error=''
              name='title'
              label='Title'
              disabled={saving}
              value={description}
              onChange={this._handleInput}
            />

            <div className={cn.grid}>
              {files.map((file, idx) =>
                <ImageItem
                  onClear={() => this._removeFile(idx)}
                  disabled={saving}
                  name={file.name}
                  key={file.name}
                  src={file.src}
                />
              )}
              {files.length < MAXIMUM_IMAGE_COUNT && (
                <AddImageButton
                  count={files.length}
                  onClick={this._addFileClick}
                />
              )}
            </div>
          </CardBody>
          <CardActions border>
            <Button
              color
              disabled={files.length < 2 || saving}
              onClick={this._handleSubmit}
            >
              save
            </Button>
          </CardActions>
        </Card>

        {/* File input */}
        <input
          multiple
          type='file'
          ref='fileInput'
          onChange={this._handleFiles}
          accept='image/jpeg,image/png'
          className={cn.fileInput}
        />
      </div>
    )
  }
}
BikeshedCreator.propTypes = {
  viewer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

/**
 * Connect BikeshedCreator with Relay
 */
export const BikeshedCreatorContainer = Relay.createContainer(BikeshedCreator, {
  fragments: {
    viewer () {
      return Relay.QL`
        fragment on User {
          ${CreateBikeshedMutation.getFragment('viewer')}
        }
      `
    }
  }
})

/**
 * Image preview inside the grid
 * Includes a clear button to allow the user to remove it
 */
export function ImageItem ({ onClear, name, src, disabled }: Object): ReactElement {
  return (
    <div className={cn.imageItem}>
      <button
        type='button'
        onClick={onClear}
        disabled={disabled}
        className={cn.clearButton}
      >
        <Icon size={24} type={ICONS.CLEAR}/>
      </button>
      <img
        className={cn.image}
        alt={name}
        src={src}
      />
    </div>
  )
}
Object.assign(ImageItem, {
  propTypes: {
    disabled: PropTypes.bool.isRequired,
    onClear: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }
})

/**
 * Button for users to click on to add images
 * Shows a message when there's fewer than two images
 */
export function AddImageButton ({ count, onClick }: Object): ReactElement {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn.addButton}
    >
      <div className={cn.addButtonIcon}>
        <Icon size={48} type={ICONS.ADD}/>
      </div>
      {count < 2 && (
        <div className={cn.addButtonText}>
          {`Please add ${count ? '1 image' : '2 images'}`}
        </div>
      )}
    </button>
  )
}
Object.assign(AddImageButton, {
  propTypes: {
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
  }
})
