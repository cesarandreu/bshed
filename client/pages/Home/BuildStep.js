import { MINIMUM_IMAGE_COUNT } from 'shared/constants'
import { RaisedButton } from 'components/Button'
import { Step } from 'components/Stepper'
import React, { PropTypes } from 'react'

export function BuildStep ({ imageCount, saving, submitForm, title }) {
  const active = imageCount >= MINIMUM_IMAGE_COUNT && title.length > 0

  return (
    <Step
      active={active}
      name='Build it!'
      number={3}
    >
      <RaisedButton
        disabled={!active || saving}
        light
        onClick={submitForm}
        primary
      >
        Submit
      </RaisedButton>
    </Step>
  )
}

BuildStep.propTypes = {
  imageCount: PropTypes.number.isRequired,
  saving: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
