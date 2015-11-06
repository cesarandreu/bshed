/**
 * ImageViewer
 * @flow
 */
import React, { Component, PropTypes } from 'react'
import { WindowSize } from '@components/WindowSize'
import { Motion, spring } from 'react-motion'
import { Modal } from 'react-overlays'
import cn from './ImageViewer.css'

export class ImageViewer extends Component {
  render () {
    const { imageList, idx, onHide, show, windowWidth, windowHeight } = this.props
    const { fullUrl, width, height } = imageList[idx]

    const widthPercentage = Math.min(
      windowWidth * 0.8,
      width
    ) / width

    const heightPercentage = Math.min(
      windowHeight * 0.8,
      height
    ) / height

    const smallestPercentage = Math.min(widthPercentage, heightPercentage)

    return (
      <Modal
        backdropClassName={cn.backdrop}
        className={cn.wrapper}
        onHide={onHide}
        show={show}
      >
        <div className={cn.modal}>
          <Motion
            style={{
              left: spring((windowWidth / 2) - (smallestPercentage * width / 2)),
              top: spring((windowHeight / 2) - (smallestPercentage * height / 2)),
              width: spring(smallestPercentage * width),
              height: spring(smallestPercentage * height)
            }}
          >
            {style =>
              <div
                className={cn.content}
                style={{
                  top: style.top,
                  left: style.left,
                  width: style.width,
                  height: style.height
                }}
              >
                <button className={cn.backButton}/>
                <img
                  className={cn.image}
                  src={fullUrl}
                />
                <button className={cn.nextButton}/>
              </div>
            }
          </Motion>
        </div>
      </Modal>
    )
  }
}
ImageViewer.propTypes = {
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  windowHeight: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  idx: PropTypes.number.isRequired,
  onHide: PropTypes.func.isRequired,
  imageList: PropTypes.arrayOf(PropTypes.shape({
    fullUrl: PropTypes.string.isRequired
  }).isRequired)
}

export default WindowSize()(ImageViewer)
