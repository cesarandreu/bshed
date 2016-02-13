import { Example, Examples } from 'components/Example'
import { Icon, ICON_TYPES, ICON_SIZES } from 'components/Icon'
import { Caption } from 'components/Text'
import React, { Component } from 'react'
import styles from './Icon.example.css'

export default class IconExample extends Component {
  render () {
    return (
      <Examples title='Icon'>
        <Example
          className={styles.container}
          title='Types'
        >
          {Object.values(ICON_TYPES).map((type) =>
            <Caption
              className={styles.box}
              dark
              secondary
              key={type}
            >
              <Icon
                size={ICON_SIZES.LARGE}
                type={type}
              />
              {type}
            </Caption>
          )}
        </Example>
      </Examples>
    )
  }
}
