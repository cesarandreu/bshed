/**
 * Users can create bikesheds from here
 * They add images, give it a title, and build it
 * @TODO: Show toast message for invalid files
 * @TODO: Show loader when saving
 */
import {
  ALLOWED_MIMETYPES,
  MAXIMUM_IMAGE_COUNT,
  MAXIMUM_IMAGE_SIZE
} from 'bshed-constants'
import { CreateBikeshedMutation } from 'client/mutations/CreateBikeshedMutation'
import { Card } from 'components/Card'
import { Layout, LayoutContent, LayoutToolbar } from 'components/Layout'
import { Page } from 'components/Page'
import { Stepper } from 'components/Stepper'
import React, { Component, PropTypes } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Relay from 'react-relay'
import { AddImagesStep } from './AddImagesStep'
import { BuildStep } from './BuildStep'
import { ConnectedFileReceiver } from './FileReceiver'
import { TitleStep } from './TitleStep'

const FILE_INPUT_ACCEPT = ALLOWED_MIMETYPES.join(',')

// This container is responsible for managing the Home page's state
export class HomeContainer extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // Form
      duration: 60,
      images: [],
      title: '',

      // UI
      saving: false
    }
    this.clickFileInput = this.clickFileInput.bind(this)
    this.receiveFiles = this.receiveFiles.bind(this)
    this.removeFile = this.removeFile.bind(this)
    this.setFileInput = this.setFileInput.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.updateImage = this.updateImage.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
  }

  // Add the list of new items to the images list
  // Creates the object url for each file
  addFiles (newFiles) {
    const newImages = newFiles.map(file => ({
      file: file,
      fileName: file.name,
      name: file.name,
      src: global.URL.createObjectURL(file)
    }))

    this.setState({
      images: [...this.state.images, ...newImages]
    })
  }

  clickFileInput () {
    this.fileInput.click()
  }

  // Destroy all url objects when we navigate away
  componentWillUnmount () {
    this.state.images.forEach(image =>
      global.URL.revokeObjectURL(image.src)
    )
  }

  // Gets the files from the event
  receiveFiles ({ files }) {
    const { images } = this.state
    const imageNames = new Set(images.map(image => image.fileName))

    const newFiles = Array.from(files)
    .filter(file => file.size < MAXIMUM_IMAGE_SIZE)
    .filter(file => ALLOWED_MIMETYPES.includes(file.type))
    .reduce((newFiles, file) => {
      if (!imageNames.has(file.name) && imageNames.size < MAXIMUM_IMAGE_COUNT) {
        imageNames.add(file.name)
        return [...newFiles, file]
      } else {
        return newFiles
      }
    }, [])

    this.addFiles(newFiles)
  }

  // Remove the file and revoke its object url
  removeFile (fileName) {
    const images = this.state.images
    .reduce((images, image) => {
      if (image.fileName === fileName) {
        global.URL.revokeObjectURL(image.src)
        return images
      } else {
        return [...images, image]
      }
    }, [])

    this.setState({
      images
    })
  }

  setFileInput (input) {
    this.fileInput = input
  }

  // Upload the files and create the bikeshed
  // Navigates to the bikeshed if succesful
  submitForm () {
    const { history } = this.props
    const { duration, images, title } = this.state
    this.setState({ saving: true })
    Relay.Store.update(new CreateBikeshedMutation({ duration, images, title }), {
      // @TODO: Show a toast message
      onFailure: transaction => {
        this.setState({ saving: false })
      },
      onSuccess: response => {
        this.setState({ saving: false })

        // Navigate to newly created bikeshed page
        const bikeshedId = response.createBikeshed.bikeshed.id
        history.pushState({ bikeshedId }, `/bikesheds/${bikeshedId}`)
      }
    })
  }

  updateImage ({ fileName, value }) {
    const { images } = this.state
    this.setState({
      images: images.map(image =>
        image.fileName === fileName
          ? ({ ...image, name: value })
          : image
      )
    })
  }

  updateTitle (title) {
    this.setState({ title })
  }

  render () {
    const {
      images,
      saving,
      title
    } = this.state

    return (
      <ConnectedFileReceiver
        imageCount={images.length}
        receiveFiles={this.receiveFiles}
      >
        <Layout>
          <LayoutToolbar title='Bikeshed builder'/>
          <LayoutContent>
            <Home
              clickFileInput={this.clickFileInput}
              images={images}
              removeFile={this.removeFile}
              saving={saving}
              submitForm={this.submitForm}
              title={title}
              updateImage={this.updateImage}
              updateTitle={this.updateTitle}
              {...this.props}
            />

            {/* Hidden image input */}
            <input
              accept={FILE_INPUT_ACCEPT}
              multiple
              onChange={e => this.receiveFiles(e.target)}
              ref={this.setFileInput}
              style={{ display: 'none' }}
              type='file'
            />
          </LayoutContent>
        </Layout>
      </ConnectedFileReceiver>
    )
  }
}

HomeContainer.propTypes = {
  history: PropTypes.object.isRequired,
  viewer: PropTypes.object.isRequired
}

// Connect HomeContainer so react-dnd will work
// This is needed because HomeContainer renders ConnectedFileReceiver
const WrappedHomeContainer = DragDropContext(HTML5Backend)(HomeContainer)

export default Relay.createContainer(WrappedHomeContainer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          isRegistered,
          name
        }
      }
    `
  }
})

export class Home extends Component {
  render () {
    const {
      clickFileInput,
      images,
      removeFile,
      saving,
      submitForm,
      title,
      updateImage,
      updateTitle
    } = this.props

    const imageCount = images.length
    return (
      <Page>
        <Card>
          <Stepper>
            <AddImagesStep
              images={images}
              onAddImage={clickFileInput}
              removeFile={removeFile}
              saving={saving}
              updateImage={updateImage}
            />

            <TitleStep
              imageCount={imageCount}
              saving={saving}
              title={title}
              updateTitle={updateTitle}
            />

            <BuildStep
              imageCount={imageCount}
              saving={saving}
              submitForm={submitForm}
              title={title}
            />
          </Stepper>
        </Card>
      </Page>
    )
  }
}

Home.propTypes = {
  clickFileInput: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  removeFile: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  updateImage: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired
}
