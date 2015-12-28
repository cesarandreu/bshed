import cn from 'classnames'
import React, { Component, PropTypes } from 'react'
import styles from './PreloadImage.css'

export class PreloadImage extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      hasLoaded: false,
      ratio: 1
    }
    this._getImage = this._getImage.bind(this)
    this._onLoad = this._onLoad.bind(this)
  }

  _onLoad () {
    this.setState({
      hasLoaded: true,
      ratio: (this.image.naturalWidth / this.image.naturalHeight) || 1
    })
  }

  _getImage (image) {
    this.image = image
  }

  render () {
    const { size, src } = this.props
    const { hasLoaded, ratio } = this.state

    const imageClassNames = cn(styles.image, styles.animated, {
      [styles.loaded]: hasLoaded,
      [styles.tallImage]: ratio <= 1,
      [styles.wideImage]: ratio >= 1
    })

    return (
      <div className={styles.wrapper}>
        <img
          className={imageClassNames}
          onLoad={this._onLoad}
          ref={this._getImage}
          src={src}
          style={{
            top: `calc(50% - ${size / 2}px)`,
            left: `calc(50% - ${size / 2}px)`
          }}
        />
      </div>
    )
  }
}

PreloadImage.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}
