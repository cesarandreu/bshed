/**
 * This is where you can view and vote on a bikesheds' bikes
 */
import { BIKESHED_STATUS } from 'shared/constants'
// import { Card } from 'components/Card'
import { LayoutToolbar, PageLayoutContainer } from 'components/Layout'
// import { Page } from 'components/Page'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import { BikeshedViewContainer } from './BikeshedView'
import { ErrorViewContainer } from './ErrorView'
import { LoadingViewContainer } from './LoadingView'
// import styles from './BikeshedViewer.css'

/**
 * BikeshedViewerPage
 */
export class BikeshedViewerPage extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
    }
  }

  render () {
    const { bikeshed } = this.props
    return (
      <PageLayoutContainer
        toolbar={
          <LayoutToolbar
            title='Bikeshed'
          />
        }
      >
        <BikeshedViewerViewContainer
          bikeshed={bikeshed}
        />
      </PageLayoutContainer>
    )
  }
}

BikeshedViewerPage.propTypes = {
  bikeshed: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Relay.createContainer(BikeshedViewerPage, {
  fragments: {
    bikeshed: () => Relay.QL`
      fragment on Bikeshed {
        ${BikeshedViewerViewContainer.getFragment('bikeshed')},
      }
    `
  }
})

export class BikeshedViewerView extends Component {
  render () {
    const { bikeshed } = this.props
    switch (bikeshed.status) {
      case BIKESHED_STATUS.ACTIVE:
      case BIKESHED_STATUS.CLOSED:
        return <BikeshedViewContainer bikeshed={bikeshed}/>

      // Show loading page for processing and queued
      case BIKESHED_STATUS.PROCESSING:
      case BIKESHED_STATUS.QUEUED:
        return <LoadingViewContainer bikeshed={bikeshed}/>

      // Error page is also used a final fallback
      case BIKESHED_STATUS.ERROR:
      default:
        return <ErrorViewContainer bikeshed={bikeshed}/>
    }
  }
}

BikeshedViewerView.propTypes = {
  bikeshed: PropTypes.object.isRequired
}

export const BikeshedViewerViewContainer = Relay.createContainer(BikeshedViewerView, {
  fragments: {
    bikeshed: () => Relay.QL`
      fragment on Bikeshed {
        status,
        ${BikeshedViewContainer.getFragment('bikeshed')},
        ${ErrorViewContainer.getFragment('bikeshed')},
        ${LoadingViewContainer.getFragment('bikeshed')},
      }
    `
  }
})
