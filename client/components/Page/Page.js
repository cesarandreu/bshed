/**
 * Page
 * @flow
 */
import { Subhead } from '@components/Text'
import type { ReactElement } from 'react'
import React, { PropTypes } from 'react'
import cn from './Page.css'

export function Page ({ children }: Object): ReactElement {
  return (
    <div className={cn.page}>
      {children}
    </div>
  )
}
Object.assign(Page, {
  propTypes: {
    children: PropTypes.node.isRequired
  }
})

export function PageSubhead ({ children }: Object): ReactElement {
  return (
    <Subhead className={cn.subhead}>
      {children}
    </Subhead>
  )
}
Object.assign(PageSubhead, {
  propTypes: {
    children: PropTypes.node.isRequired
  }
})
