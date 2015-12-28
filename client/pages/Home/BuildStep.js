import { MINIMUM_IMAGE_COUNT } from 'bshed-constants'
import { Button } from 'components/Button'
import { Link } from 'components/Link'
import { Step } from 'components/Stepper'
import { Hint } from 'components/Text'
import React, { PropTypes } from 'react'
import styles from './BuildStep.css'

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
      <TermsHintText/>
    </Step>
  )
}

BuildStep.propTypes = {
  imageCount: PropTypes.number.isRequired,
  saving: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

function TermsHintText () {
  return (
    <div className={styles.terms}>
      <Hint>
        By uploading, you agree to our <Link to='/terms'>terms of service</Link>
      </Hint>
    </div>
  )
}
