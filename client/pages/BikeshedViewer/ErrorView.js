/**
 * Bikeshed error view
 * This is visible when state is error
 */
import { Page } from 'components/Page'
import { Headline } from 'components/Text'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

export class ErrorView extends Component {
  render () {
    const { bikeshed } = this.props
    return (
      <Page>
        <Headline>
          There was an error: {bikeshed.processingOutput}
        </Headline>
      </Page>
    )
  }
}

ErrorView.propTypes = {
  bikeshed: PropTypes.object.isRequired
}

export const ErrorViewContainer = Relay.createContainer(ErrorView, {
  fragments: {
    bikeshed: () => Relay.QL`
      fragment on Bikeshed {
        processingOutput
      }
    `
  }
})
