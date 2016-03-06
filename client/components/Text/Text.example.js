import { Example, Examples } from 'components/Example'
import {
  Display4,
  Display3,
  Display2,
  Display1,
  Headline,
  Title,
  Subhead,
  Body2,
  Body1,
  Caption,
  ButtonText
} from 'components/Text'
import React, { Component } from 'react'
import styles from './Text.example.css'

const TEXT = [
  Display4,
  Display3,
  Display2,
  Display1,
  Headline,
  Title,
  Subhead,
  Body2,
  Body1,
  Caption,
  ButtonText
]

export default class TextExample extends Component {
  render () {
    return (
      <Examples title='Text'>
        <Example title='Typographic scale'>
          <div className={styles.container}>
            {TEXT.map((Component) =>
              <div
                className={styles.text}
                key={Component.displayName}
              >
                <Body2 dark secondary className={styles.name}>
                  {Component.displayName}
                </Body2>
                <Component dark primary className={styles.value}>
                  {Component.displayName}
                </Component>
              </div>
            )}
          </div>
        </Example>
      </Examples>
    )
  }
}
