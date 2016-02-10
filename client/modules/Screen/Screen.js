import getScreenSize from 'client/lib/getScreenSize'
import { debounce } from 'lodash'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ScreenActions } from './ScreenModule'

// Track screen orientation and size
export class Screen extends Component {
  constructor (props, context) {
    super(props, context)
    this.updateOrientation = this.updateOrientation.bind(this)
    this.updateSize = debounce(this.updateSize.bind(this), 100)
  }

  componentDidMount () {
    // Orientation
    this.orientationMediaQueryList = window.matchMedia('(orientation: landscape)')
    this.orientationMediaQueryList.addListener(this.updateOrientation)
    this.updateOrientation(this.orientationMediaQueryList)

    // Size
    window.addEventListener('resize', this.updateSize, false)
    this.updateSize()
    this.updateSize.flush()
  }

  componentWillUnmount () {
    // Orientation
    this.orientationMediaQueryList.removeListener(this.updateOrientation)

    // Size
    window.removeEventListener('resize', this.updateSize, false)
    this.updateSize.cancel()
  }

  updateOrientation (mediaQueryList) {
    const orientation = mediaQueryList.matches ? 'landscape' : 'portrait'
    this.props.updateOrientation(orientation)
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
  updateSize: PropTypes.func.isRequired,

  // (orientation: string) => void
  updateOrientation: PropTypes.func.isRequired
}

export const ScreenContainer = connect(() => ({}), {
  updateOrientation: ScreenActions.updateOrientation,
  updateSize: ScreenActions.updateSize
})(Screen)
