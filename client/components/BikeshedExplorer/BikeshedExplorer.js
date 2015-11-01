/**
 * BikeshedExplorer
 * @flow
 */
// import cn from './BikeshedExplorer.css'
import type { ReactElement } from 'react'
// import { Card, CardActions, CardBody } from '../Card'
import React, { Component, PropTypes } from 'react'
// import { Icon, ICONS } from '@components/Icon'
// import { Button } from '@components/Button'
import { Subhead } from '@components/Text'
// import Relay from 'react-relay'

/**
 * BikeshedExplorer page
 */
export class BikeshedExplorer extends Component {
  constructor (props: Object) {
    super(props)
    this.state = {}
  }

  render (): ReactElement {
    console.log('this.props', this.props)
    return (
      <div>
        <Subhead>
          BikeshedExplorer
        </Subhead>
        <div>
          TODO
        </div>
      </div>
    )
  }
}
BikeshedExplorer.propTypes = {
  bikeshed: PropTypes.object.isRequired
}

/**
 * Connect BikeshedExplorer with Relay
 */
export const BikeshedExplorerContainer = BikeshedExplorer
// export const BikeshedExplorerContainer = Relay.createContainer(BikeshedExplorer, {
//   fragments: {
//     bikeshed () {
//       return Relay.QL`
//         fragment on Bikeshed {
//           id
//         }
//       `
//     }
//   }
// })
