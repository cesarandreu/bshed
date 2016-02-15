import { Example, Examples } from 'components/Example'
import { Link } from 'components/Link'
import { Body2 } from 'components/Text'
import React, { Component } from 'react'

export default class LinkExample extends Component {
  render () {
    return (
      <Examples title='Link'>
        <Example title='Body link'>
          <Body2>
            <Link to='/'>
              This whole sentence is a link!
            </Link>
          </Body2>
        </Example>
      </Examples>
    )
  }
}
