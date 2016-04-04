import { CardContent, CardTitle } from 'components/Card'
import { PaperPageContainer } from 'components/Page'
import { PreloadImage } from 'components/PreloadImage'
import { Body2 } from 'components/Text'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import styles from './BikeshedView.css'

export class BikeshedView extends Component {
  render () {
    const { bikeshed } = this.props
    return (
      <PaperPageContainer>
        <CardTitle>
          {bikeshed.title}
        </CardTitle>
        <CardContent>
          {bikeshed.bikes.map((bike) =>
            <BikeItemPreview
              key={bike.key}
              name={bike.name}
              url={bike.url}
            />
          )}
        </CardContent>
      </PaperPageContainer>
    )
  }
}

BikeshedView.propTypes = {
  bikeshed: PropTypes.object.isRequired
}

export const BikeshedViewContainer = Relay.createContainer(BikeshedView, {
  fragments: {
    bikeshed: () => Relay.QL`
      fragment on Bikeshed {
        bikes {
          key,
          name,
          url(size: THUMBNAIL),
        },
        status,
        title,
        votePermission
      }
    `
  }
})

function BikeItemPreview ({ name, url }) {
  return (
    <div className={styles.itemPreview}>
      <div className={styles.itemPreviewImage}>
        <PreloadImage
          size={96}
          src={url}
        />
      </div>
      <div className={styles.itemPreviewBody}>
        <Body2 dark primary>
          {name}
        </Body2>
      </div>
    </div>
  )
}
