import cn from 'classnames'
import { MOBILE_SCREEN_MEDIA, MOBILE_TOOLBAR_HEIGHT } from 'components/styles/constants'
import { Title } from 'components/Text'
import raf from 'raf'
import React, { Component, PropTypes } from 'react'
import styles from './Layout.css'
import { DetectEnvironment } from 'client/utils/DetectEnvironment'

/**
 * PageLayout is our common page layout
 * It has a fixed header that disappears when you scroll on mobile
 */
class PageLayout extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      scrollTop: 0,
      toolbarY: 0
    }
    this.nextToolbarUpdate = null
    this.onScroll = this.onScroll.bind(this)
    this.setPage = this.setPage.bind(this)
    this.updateToolbar = this.updateToolbar.bind(this)
  }

  componentWillUnmount () {
    if (this.nextToolbarUpdate) {
      raf.cancel(this.nextToolbarUpdate)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isDesktop !== nextProps.isDesktop) {
      this.setState({
        toolbarY: 0
      })
    }
  }

  onScroll (e) {
    if (this.nextToolbarUpdate) {
      raf.cancel(this.nextToolbarUpdate)
    }
    this.nextToolbarUpdate = raf(this.updateToolbar)
  }

  setPage (page) {
    this.page = page
  }

  updateToolbar () {
    this.nextToolbarUpdate = null

    const { scrollTop, toolbarY } = this.state
    const nextScrollTop = this.page.scrollTop

    const scrollDelta = scrollTop - nextScrollTop
    const nextToolbarY = toolbarY + scrollDelta

    this.setState({
      scrollTop: nextScrollTop,
      toolbarY: Math.max(Math.min(nextToolbarY, 0), -MOBILE_TOOLBAR_HEIGHT)
    })
  }

  render () {
    const { children, fixed, isDesktop, isMobile, toolbar } = this.props
    const { toolbarY } = this.state
    const toolbarTransform = !fixed && isMobile
      ? `translate3d(0, ${toolbarY}px, 0)`
      : 'translate3d(0, 0, 0)'

    return (
      <div
        className={styles.page}
        onScroll={!fixed && this.onScroll}
        ref={this.setPage}
      >
        <div
          className={cn(styles.pageToolbar, {
            [styles.pageToolbarShadow]: isDesktop || (toolbarY + MOBILE_TOOLBAR_HEIGHT)
          })}
          style={{
            transform: toolbarTransform,
            WebkitTransform: toolbarTransform
          }}
        >
          {toolbar}
        </div>
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
  isDesktop: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  toolbar: PropTypes.element.isRequired
}

export const PageLayoutContainer = DetectEnvironment(MOBILE_SCREEN_MEDIA)(PageLayout)

export function LayoutToolbar ({ children, title }) {
  return (
    <header
      aria-label={title}
      className={styles.toolbar}
      role='toolbar'
    >
      <Title className={styles.toolbarTitle}>
        {title}
      </Title>

      {children}
    </header>
   )
}

LayoutToolbar.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}
