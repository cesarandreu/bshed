import cn from 'classnames'
import { DetectEnvironment } from 'client/utils/DetectEnvironment'
import { MOBILE_SCREEN_MEDIA } from 'components/styles/constants'
import React, { PropTypes } from 'react'
import styles from './Page.css'

function PaperPage ({ children, isDesktop }) {
  return (
    <div
      className={cn(styles.paperPage, {
        [styles.paperPageShadow]: isDesktop
      })}
    >
      {children}
    </div>
  )
}

PaperPage.propTypes = {
  children: PropTypes.node.isRequired,
  isDesktop: PropTypes.bool.isRequired
}

export const PaperPageContainer = DetectEnvironment(MOBILE_SCREEN_MEDIA)(PaperPage)
