/**
 * BikeshedCreator
 * @flow
 */
import { CreateBikeshedMutation } from '@client/mutations/CreateBikeshedMutation'
import { createObjectURL, revokeObjectURL } from '@client/lib/URL'
import shouldPureComponentUpdate from 'react-pure-render/function'
import bikeshedCreatorClassNames from './BikeshedCreator.css'
import type { SyntheticEvent, ReactElement } from 'react'
import { Card, CardActions, CardBody } from '../Card'
import React, { Component, PropTypes } from 'react'
import { TextInput } from '../TextInput'
import { Icon, ICONS } from '../Icon'
import { Button } from '../Button'
import { Subhead } from '../Text'
import Relay from 'react-relay'

const MAXIMUM_IMAGE_COUNT = 5

/**
 * BikeshedCreator page
 */
export class BikeshedCreator extends Component {
  constructor (props: Object) {
    super(props)
    this.state = {
      description: '',
      files: []
    }
    this._handleInput = this._handleInput.bind(this)
    this._handleFiles = this._handleFiles.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._addFileClick = this._addFileClick.bind(this)
    this.shouldComponentUpdate = shouldPureComponentUpdate
  }

  _handleSubmit () {
    const { viewer } = this.props
    const { description, files } = this.state
    Relay.Store.update(new CreateBikeshedMutation({ viewer, description, files }))
  }

  _handleInput (e: SyntheticEvent) {
    const description = e.target.value
    this.setState({ description })
  }

  _handleFiles (e: SyntheticEvent) {
    const { files } = this.state
    const remainingSpaces = MAXIMUM_IMAGE_COUNT - files.length
    const inputFiles = Array.from(e.target.files)
      .slice(0, remainingSpaces)
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
    const { description, files } = this.state

    return (
      <div className={bikeshedCreatorClassNames.wrapper}>
        <div className={bikeshedCreatorClassNames.page}>
          <Subhead className={bikeshedCreatorClassNames.subhead}>
            Bikeshed Creator
          </Subhead>
          <Card>
            <CardBody>
              <TextInput
                error=''
                name='title'
                label='Title'
                value={description}
                onChange={this._handleInput}
              />

              <div className={bikeshedCreatorClassNames.grid}>
                {files.map((file, idx) =>
                  <ImageItem
                    onClear={() => this._removeFile(idx)}
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
                disabled={files.length < 2}
                onClick={this._handleSubmit}
              >
                save
              </Button>
            </CardActions>
          </Card>
        </div>

        {/* File input */}
        <input
          multiple
          type='file'
          ref='fileInput'
          onChange={this._handleFiles}
          accept='image/jpeg,image/png'
          className={bikeshedCreatorClassNames.fileInput}
        />
      </div>
    )
  }
}
BikeshedCreator.propTypes = {
  viewer: PropTypes.object.isRequired
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
 * Includes a clear icon to allow the user to remove it
 */
export function ImageItem ({ onClear, name, src }: Object): ReactElement {
  return (
    <div className={bikeshedCreatorClassNames.imageItem}>
      <button
        onClick={onClear}
        className={bikeshedCreatorClassNames.clearButton}
      >
        <Icon size={24} type={ICONS.CLEAR}/>
      </button>
      <img
        className={bikeshedCreatorClassNames.image}
        alt={name}
        src={src}
      />
    </div>
  )
}
Object.assign(ImageItem, {
  propTypes: {
    onClear: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }
})

/**
 * Button for users to click on to add images
 * Shows a message inside when there's fewer than two images
 */
export function AddImageButton ({ count, onClick }: Object): ReactElement {
  return (
    <button
      onClick={onClick}
      className={bikeshedCreatorClassNames.addButton}
    >
      <div className={bikeshedCreatorClassNames.addButtonIcon}>
        <Icon size={48} type={ICONS.ADD}/>
      </div>
      {count < 2 && (
        <div className={bikeshedCreatorClassNames.addButtonText}>
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
