/**
 * This page shows our terms of use
 * @TODO: Get terms of use
 */
import { Layout, LayoutContent, LayoutToolbar } from 'components/Layout'
import React from 'react'
import styles from './Terms.css'

export default function Terms () {
  return (
    <Layout>
      <LayoutToolbar title='Bikeshed'/>
      <LayoutContent>
        <div className={styles.terms}>
          Terms~
        </div>
      </LayoutContent>
    </Layout>
  )
}
