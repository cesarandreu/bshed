// import cn from 'classnames'
import { CardContent } from 'components/Card'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import styles from './BikesPanel.css'
import { PreloadImage } from 'components/PreloadImage'

/**
 * BikesPanel
 */
export class BikesPanel extends Component {
  render () {
    const { bikeshed } = this.props
    return (
      <CardContent>
        <div className={styles.panel}>
          {bikeshed.bikes.map((bike) =>
            <PreloadImage
              alt={bike.name}
              src={bike.url}
              size={96}
              key={bike.key}
            />
          )}
        </div>
      </CardContent>
    )
  }
}

BikesPanel.propTypes = {
  bikeshed: PropTypes.object.isRequired
}

export const BikesPanelContainer = Relay.createContainer(BikesPanel, {
  fragments: {
    bikeshed: () => Relay.QL`
      fragment on Bikeshed {
        bikes {
          key,
          name,
          url(size: FULL),
        }
      }
    `
  }
})
