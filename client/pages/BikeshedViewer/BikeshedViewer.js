/**
 * BikeshedViewer
 * @flow
 */
// import { Card, CardActions, CardBody } from '../Card'
// import { Icon, ICON_TYPES } from '@components/Icon'
// import { Button } from '@components/Button'
import ImageViewer from '@components/ImageViewer'
import { Page, PageSubhead } from '@components/Page'
import React, { Component, PropTypes } from 'react'
import { Motion, spring } from 'react-motion'
import partition from 'linear-partitioning'
import type { ReactElement } from 'react'
import debounce from 'lodash.debounce'
import cn from './BikeshedViewer.css'
import Relay from 'react-relay'

const LINE_HEIGHT = 220
const IMAGE_PADDING = 2

function getRatioSum (list) {
  return list.reduce((ratioSum, { ratio }) => ratioSum + ratio, 0)
}

function calculateRowHeight (list, maxWidth) {
  const ratioSum = getRatioSum(list)
  return Math.ceil((maxWidth - (IMAGE_PADDING * (list.length - 1))) / ratioSum)
}

function calculatePositions (list, maxWidth) {
  const ratioSum = getRatioSum(list)
  const rowCount = Math.max(
    Math.min(
      ((ratioSum * LINE_HEIGHT) / maxWidth) | 0,
      list.length
    ),
    1
    // list.length > 4 ? 2 : 1
  )

  const ratioList = list.map(item => item.ratio)
  return partition(ratioList, rowCount)
  .reduce((result, items) => {
    const slice = list.slice(result.length, result.length + items.length)
    const height = calculateRowHeight(slice, maxWidth)

    // This will get us the last result from the previous row
    const lastResult = result[result.length - 1]
    const top = lastResult
      ? (lastResult.top + lastResult.height + IMAGE_PADDING)
      : 0
    const bottom = top + height

    // Get the styles for each item in this row
    const row = slice.reduce((row, item, idx) => {
      const width = (height * item.ratio) | 0
      const lastItem = row[row.length - 1]
      const left = lastItem
        ? lastItem.right + IMAGE_PADDING
        : 0
      const right = left + width
      const rowItem = { top, right, bottom, left, width, height }
      return [...row, rowItem]
    }, [])

    return [...result, ...row]
  }, [])
}

function springifyStyles (styleList) {
  return styleList.map(style =>
    Object.entries(style).reduce((style, [name, value]) =>
      ({ ...style, [name]: spring(value) })
    , {})
  )
}

/**
 * BikeshedViewer page
 */
export class BikeshedViewer extends Component {
  constructor (props: Object) {
    super(props)
    this.state = {
      bikePositions: [],
      imagePreviewItem: 0,
      imagePreviewOpen: false
    }
    this.refreshData = this.refreshData.bind(this)
    this.getBikeStyles = this.getBikeStyles.bind(this)
    this.debouncedRefresh = debounce(this.refreshData, 100)

    this.closeImagePreview = this.closeImagePreview.bind(this)
    this.openImagePreview = this.openImagePreview.bind(this)
    this.nextImagePreview = this.nextImagePreview.bind(this)
    this.backImagePreview = this.backImagePreview.bind(this)
  }

  componentDidMount () {
    this.refreshData()
    window.addEventListener('resize', this.debouncedRefresh)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.debouncedRefresh)
  }

  refreshData () {
    clearTimeout(this.refreshDataTimeout)
    const { bikeshed, relay } = this.props
    if (bikeshed.status === 'READY') {
      this.getBikeStyles()
    } else if (bikeshed.status !== 'ERROR') {
      this.refreshDataTimeout = setTimeout(() => {
        relay.forceFetch({}, readyState => {
          if (readyState.ready && readyState.done) {
            this.refreshData()
          }
        })
      }, 200)
    }
  }

  getBikeStyles () {
    const { bikeshed } = this.props
    const maxWidth = this.refs.bikesContainer.offsetWidth
    const bikePositions = calculatePositions(bikeshed.bikes, maxWidth)
    this.setState({
      bikePositions: bikePositions
    })
  }

  closeImagePreview () {
    this.setState({
      imagePreviewOpen: false,
      imagePreviewItem: 0
    })
  }

  openImagePreview (idx) {
    this.setState({
      imagePreviewOpen: true,
      imagePreviewItem: idx
    })
  }

  nextImagePreview () {
    const { bikeshed } = this.props
    const { imagePreviewItem } = this.state
    this.setState({
      imagePreviewItem: (imagePreviewItem + 1) % bikeshed.bikes.length
    })
  }

  backImagePreview () {
    const { bikeshed } = this.props
    const { imagePreviewItem } = this.state
    this.setState({
      imagePreviewItem: ((imagePreviewItem || bikeshed.bikes.length) - 1) % bikeshed.bikes.length
    })
  }

  render (): ReactElement {
    const { bikeshed } = this.props
    const { bikePositions, imagePreviewOpen, imagePreviewItem } = this.state
    const styleList = springifyStyles(bikePositions)

    return (
      <Page>
        <PageSubhead>
          BikeshedViewer
          <ImageViewer
            idx={imagePreviewItem}
            show={imagePreviewOpen}
            imageList={bikeshed.bikes}
            onNext={this.nextImagePreview}
            onBack={this.backImagePreview}
            onHide={this.closeImagePreview}
          />
        </PageSubhead>
        <div className={cn.bikes}>
          <div>
            Status is: {bikeshed.status}
          </div>
          <div className={cn.bikes} ref='bikesContainer'>
          {bikeshed.status === 'READY' && (
            styleList
            .map((style, idx) => {
              const bike = bikeshed.bikes[idx]
              return (
                <Motion
                  key={idx}
                  style={style}
                >
                  {interpolatedStyle => (
                    <div
                      key={bike.fullUrl}
                      className={cn.bikeItem}
                      style={interpolatedStyle}
                      onClick={() => this.openImagePreview(idx)}
                    >
                      <img
                        src={bike.fullUrl}
                        style={interpolatedStyle}
                      />
                    </div>
                  )}
                </Motion>
              )
            })
          )}
          </div>
        </div>
      </Page>
    )
  }
}
BikeshedViewer.propTypes = {
  bikeshed: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired
}

/**
 * Connect BikeshedViewer with Relay
 */
export const BikeshedViewerContainer = Relay.createContainer(BikeshedViewer, {
  fragments: {
    bikeshed () {
      return Relay.QL`
        fragment on Bikeshed {
          description,
          voteCount,
          hasVoted,
          status,
          bikes {
            score,
            rating,
            fullUrl,
            height,
            width,
            ratio,
          }
        }
      `
    }
  }
})
