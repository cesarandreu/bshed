import { MINIMUM_IMAGE_COUNT } from 'bshed-constants'
import { Button } from 'components/Button'
import { Step } from 'components/Stepper'
import React, { PropTypes } from 'react'

export function BuildStep ({ imageCount, saving, submitForm, title }) {
  return (
    <Step
      active={imageCount >= MINIMUM_IMAGE_COUNT && title.length > 0}
      name='Build it!'
      number={3}
    >
      <Button
        disabled={saving}
        raised
        onClick={submitForm}
        primary
      >
        Submit
      </Button>
    </Step>
  )
}

BuildStep.propTypes = {
  imageCount: PropTypes.number.isRequired,
  saving: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
