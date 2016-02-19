import cn from 'classnames'
import { ScreenSelectors } from 'client/modules/Screen'
import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { createStructuredSelector } from 'reselect'
import styles from './Page.css'

function PaperPage ({ children, isXSmall }) {
  return (
    <div
      className={cn(styles.paperPage, {
        [styles.paperPageShadow]: !isXSmall
      })}
    >
      {children}
    </div>
  )
}

PaperPage.propTypes = {
  children: PropTypes.node.isRequired,
  isXSmall: PropTypes.bool.isRequired
}

const PaperPageContainerSelectors = createStructuredSelector({
  isXSmall: ScreenSelectors.isXSmall
})

export const PaperPageContainer = connect(
  PaperPageContainerSelectors
)(PaperPage)
