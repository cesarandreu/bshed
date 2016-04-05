/**
 * Bikeshed loading view
 * This is visible when state is queued or processing
 */
import { PaperPageContainer } from 'components/Page'
import { Headline } from 'components/Text'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

export class LoadingView extends Component {
  constructor (props, context) {
    super(props, context)
    this.forceUpdate = this.forceUpdate.bind(this)
    this._timeout = null
  }

  componentDidMount () {
    this.forceUpdate()
  }

  componentWillUnmount () {
    if (this._timeout) {
      clearTimeout(this._timeout)
    }
  }

  forceUpdate () {
    this._timeout = null
    this.props.relay.forceFetch({}, (readyState) => {
      if (readyState.ready && readyState.done && !readyState.stale) {
        this._timeout = setTimeout(this.forceUpdate, 3e3)
      }
    })
  }

  render () {
    const { bikeshed } = this.props
    return (
      <PaperPageContainer>
        <Headline>
          Please wait, bikeshed status is {bikeshed.status}…
        </Headline>
      </PaperPageContainer>
    )
  }
}

LoadingView.propTypes = {
  bikeshed: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired
}

export const LoadingViewContainer = Relay.createContainer(LoadingView, {
  fragments: {
    bikeshed: () => Relay.QL`
      fragment on Bikeshed {
        status
      }
    `
  }
})
