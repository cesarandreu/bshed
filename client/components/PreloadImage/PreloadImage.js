import { easeOut } from 'bezier-easing'
import cn from 'classnames'
import { createAnimation } from 'client/utils/createAnimation'
import React, { Component, PropTypes } from 'react'
import styles from './PreloadImage.css'
import { Motion, spring } from 'react-motion'

const IMAGE_LOAD_DURATION = 1.5e3

export class PreloadImage extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      animating: false,
      grayscale: 1,
      height: 0,
      opacity: 0,
      saturate: 0.20,
      width: 0
    }
    this._getImage = this._getImage.bind(this)
    this._onLoad = this._onLoad.bind(this)
    this.animation = createAnimation(
      this.paint.bind(this),
      IMAGE_LOAD_DURATION,
      () => this.setState({ animating: true }),
      () => this.setState({ animating: false })
    )
  }

  componentWillUnmount () {
    this.animation.stop()
  }

  // There's 3 steps in the image load animation
  // opacity lasts from 1 to 2 with percentage 0 to 1
  // grayscale lasts from 1 to 2.5 with percentage 1 to 0
  // saturate lasts from 1 to 3 with percentage 0.20 to 1
  paint (timeFraction) {
    const opacityFraction = Math.min(timeFraction, 0.5) / 0.5
    const grayscaleFraction = Math.min(timeFraction, 0.75) / 0.75

    this.setState({
      opacity: easeOut.get(opacityFraction),
      grayscale: 1 - easeOut.get(grayscaleFraction),
      saturate: 0.2 + (easeOut.get(timeFraction) * 0.8)
    })
  }

  _getImage (image) {
    this.image = image
  }

  _onLoad () {
    const image = this.image
    this.setState({
      height: image.naturalHeight,
      width: image.naturalWidth
    })
    this.animation.start()
  }

  // Here we cast all the size and position numbers to integers
  // Handling of non-integer <number> values in css is inconsistent across browsers
  calculateImageStyles () {
    const { height, width } = this.state
    const { size } = this.props

    // First take the smaller of the two dimensions
    // That will be the boundary
    const smallestDimension = Math.min(height, width)

    // Get the percentage we'd need to scale the image to fit in the box
    // We cap it at 1 so the smaller dimension can't grow past the size
    // If the smallest dimension is 0px it'll give us NaN, in which we case we use 1
    const percent = Math.min((size / smallestDimension), 1) || 1

    // Scale the height and width
    const h = percent * height | 0
    const w = percent * width | 0

    // Get the half size to help calculating the position
    // In css it would be `calc(50% - ${dimension / 2}px)`
    const halfSize = size / 2 | 0

    return {
      height: h,
      left: halfSize - (w / 2) | 0,
      top: halfSize - (h / 2) | 0,
      width: w
    }
  }

  render () {
    const { size, src } = this.props
    const { animating, opacity, grayscale, saturate } = this.state
    const imageStyles = this.calculateImageStyles()
    const imageClassNames = cn(styles.image, {
      [styles.animating]: animating
    })

    return (
      <div
        className={styles.wrapper}
        style={{
          height: size,
          width: size
        }}
      >
        <Motion
          style={{
            opacity: spring(opacity),
            grayscale: spring(grayscale),
            saturate: spring(saturate)
          }}
        >
          {({ opacity, grayscale, saturate }) => {
            const filter = `opacity(${opacity}) grayscale(${grayscale}) saturate(${saturate})`
            return (
              <img
                className={imageClassNames}
                onLoad={this._onLoad}
                ref={this._getImage}
                src={src}
                style={{
                  ...imageStyles,
                  filter: filter,
                  WebkitFilter: filter
                }}
              />
            )
          }}
        </Motion>
      </div>
    )
  }
}

PreloadImage.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}
