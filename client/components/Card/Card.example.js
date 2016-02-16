import { FlatButton } from 'components/Button'
import { Card, CardActions, CardContent } from 'components/Card'
import { Example, Examples } from 'components/Example'
import { Body1 } from 'components/Text'
import React, { Component } from 'react'
import styles from './Card.example.css'

export default class CardExample extends Component {
  render () {
    return (
      <Examples title='Card'>
        <Example
          className={styles.complete}
          description='Cards can have a headline, body, and actions.'
          title='Complete card'
        >
          <Card title='Hello, human!'>
            <CardContent>
              <Body1 dark secondary>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum euismod ullamcorper. Aenean convallis dolor sed nisl fringilla bibendum. Duis vel metus sed ipsum congue accumsan.
              </Body1>
            </CardContent>
            <CardActions>
              <FlatButton>
                action 1
              </FlatButton>

              <FlatButton>
                action 2
              </FlatButton>
            </CardActions>
          </Card>
        </Example>
      </Examples>
    )
  }
}
