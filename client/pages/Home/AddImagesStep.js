import { MAXIMUM_IMAGE_COUNT, MINIMUM_IMAGE_COUNT } from 'bshed-constants'
import { Button } from 'components/Button'
import { Icon, ICON_SIZES, ICON_TYPES } from 'components/Icon'
import { PreloadImage } from 'components/PreloadImage'
import { Step } from 'components/Stepper'
import { Hint, SecondaryText } from 'components/Text'
import { TextInput } from 'components/TextInput'
import React, { PropTypes } from 'react'
import styles from './AddImagesStep.css'

export function AddImagesStep ({ images, onAddImage, removeFile, updateImage }) {
  const imageCount = images.length
  return (
    <Step
      active
      name='Add images'
      number={1}
    >
      {images.map(({ fileName, name, src }) =>
        <ImageItem
          fileName={fileName}
          key={fileName}
          name={name}
          removeFile={removeFile}
          src={src}
          updateImage={updateImage}
        />
      )}

      {imageCount < MINIMUM_IMAGE_COUNT && (
        <MissingImagesButton
          imageCount={imageCount}
          onAddImage={onAddImage}
        />
      )}

      <div className={styles.action}>
        <Button
          disabled={imageCount === MAXIMUM_IMAGE_COUNT}
          onClick={onAddImage}
          raised
        >
          add image
        </Button>
        <Hint className={styles.hint}>
          JPEG/PNG 3MB/image
        </Hint>
      </div>
    </Step>
  )
}

AddImagesStep.propTypes = {
  images: PropTypes.array.isRequired,
  onAddImage: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired
}

function ImageItem ({ fileName, name, removeFile, src, updateImage }) {
  return (
    <div
      key={fileName}
      className={styles.imageItem}
    >
      <div className={styles.imageWrapper}>
        <PreloadImage
          size={96}
          src={src}
        />
      </div>
      <div className={styles.imageInfo}>
        <TextInput
          label='Name'
          name='name'
          onChange={e => updateImage({ fileName, value: e.target.value })}
          value={name}
        />
      </div>
      <button
        aria-label='remove image'
        className={styles.imageRemove}
        onClick={() => removeFile(name)}
        title='remove image'
        type='button'
      >
        <Icon type={ICON_TYPES.CLEAR}/>
      </button>
    </div>
  )
}

ImageItem.propTypes = {
  fileName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  removeFile: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  updateImage: PropTypes.func.isRequired
}

function MissingImagesButton ({ imageCount, onAddImage }) {
  return (
    <button
      aria-label='add image'
      className={styles.missingImage}
      onClick={onAddImage}
      type='button'
    >
      <Hint>
        <Icon
          size={ICON_SIZES.LARGE}
          type={ICON_TYPES.IMAGE}
        />
      </Hint>
      <SecondaryText>
        {missingImageText(imageCount)}
      </SecondaryText>
    </button>
  )
}

MissingImagesButton.propTypes = {
  imageCount: PropTypes.number.isRequired,
  onAddImage: PropTypes.func.isRequired
}

function missingImageText (imageCount) {
  if (imageCount === 0) {
    return `Need ${MINIMUM_IMAGE_COUNT} images…`
  } else {
    return `Need ${MINIMUM_IMAGE_COUNT - imageCount} more…`
  }
}
