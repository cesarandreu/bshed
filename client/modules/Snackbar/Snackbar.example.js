import { FlatButton } from 'components/Button'
import { Example, Examples } from 'components/Example'
import { Snackbar, SnackbarActions } from 'modules/Snackbar'
import uuid from 'node-uuid'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from './Snackbar.example.css'

const example1 = uuid.v4()
const example2 = uuid.v4()

class SnackbarExample extends Component {
  render () {
    const { addSnackbar } = this.props

    return (
      <Examples title='Snackbar'>
        <Example
          className={styles.container}
          title='Short snackbar'
        >
          <Snackbar
            id={example1}
            message='Short snackbar'
          />
        </Example>
        <Example
          className={styles.container}
          title='Long snackbar'
        >
          <Snackbar
            id={example2}
            message='This is a slightly longer snackbar message! Long snackbar is long.'
          />
        </Example>
        <Example
          className={styles.container}
          title='Animated positioned snackbars'
        >
          <FlatButton
            onClick={() => addSnackbar(uuid.v4())}
          >
            Add Snackbar
          </FlatButton>
        </Example>
      </Examples>
    )
  }
}

SnackbarExample.propTypes = {
  addSnackbar: PropTypes.func.isRequired
}

const SnackbarExampleActions = {
  addSnackbar: SnackbarActions.addSnackbar
}

export default connect(() => ({}), SnackbarExampleActions)(
  SnackbarExample
)
