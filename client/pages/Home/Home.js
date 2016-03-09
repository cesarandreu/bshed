/**
 * Users can create bikesheds from here
 * They add images, give it a title, and build it
 * @TODO: Show snackbar message for invalid files
 * @TODO: Show loader when saving
 */
import {
  ALLOWED_MIMETYPES,
  MAXIMUM_IMAGE_COUNT,
  MAXIMUM_IMAGE_SIZE
} from 'shared/constants'
import { CreateBikeshedMutation } from 'client/mutations/CreateBikeshedMutation'
import { Link } from 'components/Link'
import { LayoutToolbar, PageLayoutContainer } from 'components/Layout'
import { PaperPageContainer } from 'components/Page'
import { Stepper } from 'components/Stepper'
import { Hint } from 'components/Text'
import React, { Component, PropTypes } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Relay from 'react-relay'
import { AddImagesStep } from './AddImagesStep'
import { BuildStep } from './BuildStep'
import { ConnectedFileReceiver } from './FileReceiver'
import styles from './Home.css'
import { TitleStep } from './TitleStep'

const FILE_INPUT_ACCEPT = ALLOWED_MIMETYPES.join(',')
const allowedMimetypes = new Set(ALLOWED_MIMETYPES)

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

  clickFileInput () {
    this.fileInput.click()
  }

  // Destroy all url objects when we navigate away
  componentWillUnmount () {
    this.state.images.forEach((image) =>
      global.URL.revokeObjectURL(image.src)
    )
  }

  // Gets the files from the event
  // Add the list of new items to the images list
  // Creates the object url for each file
  receiveFiles ({ files }) {
    const { images } = this.state
    const imageNames = new Set(images.map((image) => image.fileName))

    const newImages = Array.from(files)
    .filter((file) =>
      file.size < MAXIMUM_IMAGE_SIZE &&
      allowedMimetypes.has(file.type)
    )
    .reduce((newImages, file) => {
      if (!imageNames.has(file.name) && imageNames.size < MAXIMUM_IMAGE_COUNT) {
        imageNames.add(file.name)
        return newImages.concat({
          file: file,
          fileName: file.name,
          name: file.name,
          src: global.URL.createObjectURL(file)
        })
      } else {
        return newImages
      }
    }, [])

    this.setState({
      images: images.concat(newImages)
    })
  }

  // Remove the file and revoke its object url
  removeFile (fileName) {
    const images = this.state.images
    .reduce((images, image) => {
      if (image.fileName === fileName) {
        global.URL.revokeObjectURL(image.src)
        return images
      } else {
        return images.concat(image)
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
    const { router } = this.context
    const { duration, images, title } = this.state
    this.setState({ saving: true })
    Relay.Store.commitUpdate(new CreateBikeshedMutation({ duration, images, title }), {
      // @TODO: Show a snackbar message
      onFailure: (transaction) => {
        this.setState({ saving: false })
      },
      onSuccess: (response) => {
        this.setState({ saving: false })

        // Navigate to newly created bikeshed page
        const bikeshedId = response.createBikeshed.bikeshed.id
        router.push(`/bikesheds/${bikeshedId}`)
      }
    })
  }

  updateImage ({ fileName, value }) {
    const { images } = this.state
    this.setState({
      images: images.map((image) =>
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
        <PageLayoutContainer
          toolbar={
            <LayoutToolbar
              title='Bikeshed builder'
            />
          }
        >
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
            onChange={(e) => this.receiveFiles(e.target)}
            ref={this.setFileInput}
            style={{ display: 'none' }}
            type='file'
          />
        </PageLayoutContainer>
      </ConnectedFileReceiver>
    )
  }
}

HomeContainer.contextTypes = {
  router: PropTypes.object
}

HomeContainer.propTypes = {
  viewer: PropTypes.object.isRequired
}

// First we connect HomeContainer so react-dnd will work
// This is needed because HomeContainer renders ConnectedFileReceiver
// Then we let Relay create a container
export default Relay.createContainer(DragDropContext(HTML5Backend)(HomeContainer), {
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
      <PaperPageContainer>
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
        <TermsHintText/>
      </PaperPageContainer>
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

function TermsHintText () {
  return (
    <Hint className={styles.terms}>
      By uploading, you agree to our <Link to='/terms'>terms of service</Link>
    </Hint>
  )
}
