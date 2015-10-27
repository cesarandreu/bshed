/**
 * ImageViewer
 * @flow
 */
import { WindowSize } from '@components/WindowSize'
import { Motion, spring, presets } from 'react-motion'
import { BodyPortal } from '@components/BodyPortal'
import React, { Component, PropTypes } from 'react'
import cn from './ImageViewer.css'
import Hammer from 'hammerjs'

function getZoom (windowSize, imageSize) {
  return windowSize < imageSize ? (windowSize / imageSize) : 1
}

export class ImageViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      zoom: 1,
      zoomDelta: 1,
      naturalZoom: 1
    }
  }

  componentDidMount () {
    this.hammer = new Hammer.Manager(this.refs.content, {
      recognizers: []
    })

    const tap = new Hammer.Tap({ event: 'doubletap', taps: 2 })
    const pan = new Hammer.Pan({ threshold: 0, pointers: 0 })
    const pinch = new Hammer.Pinch()

    pinch.recognizeWith(pan)
    this.hammer.add([tap, pan, pinch])

    this.hammer.on('pinchstart panstart', this.hammerStart.bind(this))
    this.hammer.on('panmove', this.hammerPanmove.bind(this))
    this.hammer.on('panend', this.hammerPanend.bind(this))
    this.hammer.on('pinchend', this.hammerPinchend.bind(this))
    this.hammer.on('pinchmove', this.hammerPinchmove.bind(this))
    this.hammer.on('doubletap', this.hammerDoubletap.bind(this))

    this.calculateImageState(this.props)
  }

  calculateImageState (props) {
    const { imageList, windowWidth, windowHeight, idx } = props
    const image = imageList[idx]

    const widthZoom = getZoom(windowWidth, image.width)
    const heightZoom = getZoom(windowHeight, image.height)
    const naturalZoom = Math.min(widthZoom, heightZoom)
    this.setState({
      x: 0,
      y: 0,
      deltaX: 0,
      deltaY: 0,
      doubletap: false,
      zoom: naturalZoom,
      naturalZoom: naturalZoom
    })
  }

  componentWillReceiveProps (nextProps) {
    this.calculateImageState(nextProps)
  }

  getZoom (zoomDelta = this.state.zoomDelta) {
    return Math.max(Math.min(this.state.zoom * zoomDelta, 2), this.state.naturalZoom)
  }

  hammerStart (e) {
    this.setState({
      doubletap: false
    })
  }

  hammerPanmove (e) {
    this.setState({
      deltaX: e.deltaX,
      deltaY: e.deltaY
    })
  }

  hammerPanend (e) {
    const { x, y } = this.state
    // const { x, y, zoom } = this.state
    // const { imageList, windowWidth, windowHeight, idx } = this.props
    // const image = imageList[idx]

    this.setState({
      // x: Math.min(Math.max(x + e.deltaX, 0), windowWidth - (image.width * zoom)),
      // y: Math.min(Math.max(y + e.deltaY, 0), windowHeight - (image.height * zoom)),
      x: x + e.deltaX,
      y: y + e.deltaY,
      deltaX: 0,
      deltaY: 0
    })
  }

  hammerPinchend (e) {
    this.setState({
      zoom: this.getZoom(e.scale),
      zoomDelta: 1
    })
  }

  hammerPinchmove (e) {
    this.setState({
      zoomDelta: e.scale
    })
  }

  hammerDoubletap (e) {
    const { naturalZoom, zoom } = this.state
    const nextZoom = naturalZoom < zoom ? naturalZoom : this.getZoom(2)
    this.setState({
      x: 0,
      y: 0,
      zoom: nextZoom,
      doubletap: true
    })
  }

  render () {
    const { imageList, idx } = this.props
    const { x, deltaX, y, deltaY, doubletap } = this.state
    const { height, width, fullUrl } = imageList[idx]
    const zoom = this.getZoom()
    return (
      <BodyPortal>
        <div className={cn.wrapper}>
          <div className={cn.backdrop}/>
          <div
            className={cn.content}
            ref='content'
          >
            <Motion
              style={{
                zoom: doubletap ? spring(zoom, presets.stiff) : zoom,
                x: doubletap ? spring(x + deltaX) : x + deltaX,
                y: doubletap ? spring(y + deltaY) : y + deltaY,
                height,
                width
              }}
            >
              {interpolatedStyle =>
                <img
                  onDragStart={e => e.preventDefault()}
                  className={cn.image}
                  src={fullUrl}
                  style={{
                    height: interpolatedStyle.height,
                    width: interpolatedStyle.width,
                    transform: `
                      translate3d(${interpolatedStyle.x}px, ${interpolatedStyle.y}px, 0)
                      scale(${interpolatedStyle.zoom}, ${interpolatedStyle.zoom})
                    `
                  }}
                />
              }
            </Motion>
          </div>
        </div>
      </BodyPortal>
    )
  }
}
ImageViewer.defaultProps = {
  idx: 0
}
ImageViewer.propTypes = {
  idx: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
  imageList: PropTypes.arrayOf(PropTypes.shape({
    fullUrl: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }))
}

export default WindowSize()(ImageViewer)
