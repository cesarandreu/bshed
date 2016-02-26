import getScreenSize from 'client/lib/getScreenSize'
import { debounce } from 'lodash'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ScreenActions } from './ScreenModule'

// Track screen size
export class Screen extends Component {
  constructor (props, context) {
    super(props, context)
    this.updateSize = debounce(this.updateSize.bind(this), 100)
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateSize, false)
    this.updateSize()
    this.updateSize.flush()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateSize, false)
    this.updateSize.cancel()
  }

  updateSize () {
    this.props.updateSize(getScreenSize())
  }

  render () {
    return null
  }
}

Screen.propTypes = {
  // ({ width: number, height: number }) => void
  updateSize: PropTypes.func.isRequired
}

const ScreenContainerActions = {
  updateSize: ScreenActions.updateSize
}

export const ScreenContainer = connect(
  null,
  ScreenContainerActions
)(Screen)
