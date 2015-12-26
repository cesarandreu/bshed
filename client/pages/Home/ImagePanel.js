/**
 * ImagePanel is what shows up in the Home card as you add images
 * It shows the image, has a TextInput for the name, and a button to remove it
 */
import React, { PropTypes } from 'react'
import styles from './ImagePanel.css'
import { CardContent } from 'components/Card'
import { Icon, ICON_TYPES } from 'components/Icon'
import { TextInput } from 'components/TextInput'

export function ImagePanel ({ fileName, name, removeFile, src, updateImage }) {
  return (
    <CardContent>
      <button
        aria-label='remove image'
        className={styles.remove}
        onClick={() => removeFile(name)}
        title='remove image'
        type='button'
      >
        <Icon type={ICON_TYPES.CLEAR}/>
      </button>
      <div className={styles.panel}>
        <div
          className={styles.imageWrapper}
          title={fileName}
        >
          <img
            className={styles.image}
            alt={name}
            src={src}
          />
        </div>

        <div className={styles.information}>
          <TextInput
            autoFocus
            label='Name'
            name='name'
            onChange={e => updateImage({ fileName, value: e.target.value })}
            value={name}
          />
        </div>
      </div>
    </CardContent>
  )
}

ImagePanel.propTypes = {
  fileName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  removeFile: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  updateImage: PropTypes.func.isRequired
}
