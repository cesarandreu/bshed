/**
 * This page shows our terms of use
 * @TODO: Get terms of use
 */
import { LayoutToolbar, PageLayoutContainer } from 'components/Layout'
import React from 'react'
import styles from './Terms.css'

export default function Terms () {
  return (
    <PageLayoutContainer
      toolbar={
        <LayoutToolbar
          title='Terms of service'
        />
      }
    >
      <div className={styles.terms}>
        Terms~
      </div>
    </PageLayoutContainer>
  )
}
