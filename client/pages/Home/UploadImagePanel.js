/**
 * UploadImagePanel is the panel that tells you how many images to upload
 * It allows you to click on it in order to add images
 * Also tells you the valid image types and their maximum size
 */
import { CardContent } from 'components/Card'
import { Icon, ICON_SIZES, ICON_TYPES } from 'components/Icon'
import { Hint, SecondaryText } from 'components/Text'
import React, { PropTypes } from 'react'
import styles from './UploadImagePanel.css'

// @TODO: Use bshed/shared/constants for file type and size
export function UploadImagePanel ({ imageCount, onClick }) {
  return (
    <CardContent>
      <button
        aria-label='add image'
        className={styles.panel}
        onClick={onClick}
        type='button'
      >
        <Hint>
          <Icon
            size={ICON_SIZES.LARGE}
            type={ICON_TYPES.CLOUD_UPLOAD}
          />
        </Hint>
        <SecondaryText>
          {imageUploadText(imageCount)}
        </SecondaryText>
      </button>

      <div className={styles.hint}>
        <Hint>
          JPEG/PNG 2MB/image
        </Hint>
      </div>
    </CardContent>
  )
}

UploadImagePanel.propTypes = {
  imageCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

function imageUploadText (imageCount) {
  switch (imageCount) {
    case 0:
      return 'Add 2 images'
    case 1:
      return 'Add 1 image'
    default:
      return ''
  }
}
