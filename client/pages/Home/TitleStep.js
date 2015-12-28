import { MINIMUM_IMAGE_COUNT } from 'bshed-constants'
import { Step } from 'components/Stepper'
import { TextInput } from 'components/TextInput'
import React, { PropTypes } from 'react'

export function TitleStep ({ imageCount, saving, title, updateTitle }) {
  return (
    <Step
      active={imageCount >= MINIMUM_IMAGE_COUNT}
      name='Give it a title'
      number={2}
    >
      <TextInput
        disabled={saving}
        label='Title'
        name='title'
        onChange={e => updateTitle(e.target.value)}
        value={title}
      />
    </Step>
  )
}

TitleStep.propTypes = {
  imageCount: PropTypes.number.isRequired,
  saving: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  updateTitle: PropTypes.func.isRequired
}
