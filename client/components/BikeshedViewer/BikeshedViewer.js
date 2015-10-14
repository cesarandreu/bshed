/**
 * BikeshedViewer
 * @flow
 */
// import cn from './BikeshedViewer.css'
import type { ReactElement } from 'react'
// import { Card, CardActions, CardBody } from '../Card'
import React, { Component, PropTypes } from 'react'
// import { Icon, ICONS } from '@components/Icon'
// import { Button } from '@components/Button'
import { Subhead } from '@components/Text'
import Relay from 'react-relay'

/**
 * BikeshedViewer page
 */
export class BikeshedViewer extends Component {
  constructor (props: Object) {
    super(props)
    this.state = {}
  }

  render (): ReactElement {
    console.log('this.props', this.props)
    console.log('bikeshed', this.props.bikeshed)
    return (
      <div>
        <Subhead>
          BikeshedViewer
        </Subhead>
        <div>
          bikeshed~
        </div>
      </div>
    )
  }
}
BikeshedViewer.propTypes = {
  bikeshed: PropTypes.object.isRequired
}

/**
 * Connect BikeshedViewer with Relay
 */
export const BikeshedViewerContainer = Relay.createContainer(BikeshedViewer, {
  fragments: {
    bikeshed () {
      return Relay.QL`
        fragment on Bikeshed {
          description,
          voteCount,
          hasVoted,
          bikes {
            score,
            rating,
            fullUrl,
          }
        }
      `
    }
  }
})
