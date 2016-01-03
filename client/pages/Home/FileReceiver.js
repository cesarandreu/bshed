/**
 * FileReceiver shows up when you try dropping a file in the Home page
 * It will only show up if you can still drop images
 */
import { MAXIMUM_IMAGE_COUNT } from 'bshed-constants'
import React, { Component, PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import styles from './FileReceiver.css'

export class FileReceiver extends Component {
  render () {
    const {
      canDrop,
      children,
      connectDropTarget,
      isOver
    } = this.props

    return connectDropTarget(
      <div className={styles.container}>
        {canDrop && isOver && (
          <div className={styles.fileOverlay}>
            <div className={styles.fileTarget}>
              Drop images
            </div>
          </div>
        )}
        {children}
      </div>
    )
  }
}

FileReceiver.propTypes = {
  canDrop: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  imageCount: PropTypes.number.isRequired
}

const fileTarget = {
  canDrop (props) {
    return props.imageCount < MAXIMUM_IMAGE_COUNT
  },

  drop (props, monitor, component) {
    const item = monitor.getItem()
    props.receiveFiles(item)
    return item
  }
}

function collect (connect, monitor) {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

export const ConnectedFileReceiver = DropTarget(
  NativeTypes.FILE,
  fileTarget,
  collect
)(FileReceiver)

