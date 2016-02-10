import { Example, Examples } from 'components/Example'
import { Display1 } from 'components/Text'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ScreenSelectors } from './ScreenModule'
import styles from './Screen.example.css'

class ScreenExample extends Component {
  render () {
    const { height, orientation, width } = this.props

    const largestDimension = Math.max(height, width)
    const percent = Math.min((256 / largestDimension), 1) || 1

    // Scale the height and width
    const h = percent * height | 0
    const w = percent * width | 0

    return (
      <Examples title='Screen'>
        <Example
          title='Size'
        >
          <div
            className={styles.size}
            style={{
              height: h,
              width: w
            }}
          >
            <Display1 light primary>
              {width} x {height}
            </Display1>
          </div>
        </Example>
        <Example
          title='Orientation'
        >
          <div
            className={styles.size}
            style={{
              height: h,
              width: w
            }}
          >
            <Display1 light primary>
              {orientation}
            </Display1>
            <div className={styles[orientation]}/>
          </div>
        </Example>
      </Examples>
    )
  }
}

ScreenExample.propTypes = {
  height: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf(['landscape', 'portrait']).isRequired,
  width: PropTypes.number.isRequired
}

const ScreenExampleSelectors = createStructuredSelector({
  height: ScreenSelectors.height,
  orientation: ScreenSelectors.orientation,
  width: ScreenSelectors.width
})

export default connect(ScreenExampleSelectors)(
  ScreenExample
)
