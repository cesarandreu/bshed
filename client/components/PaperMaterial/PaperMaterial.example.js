import { FlatButton } from 'components/Button'
import { Example, Examples } from 'components/Example'
import { PaperMaterial } from 'components/PaperMaterial'
import { Body1 } from 'components/Text'
import { random } from 'lodash'
import React, { Component } from 'react'
import styles from './PaperMaterial.example.css'

const ELEVATIONS = [0, 1, 2, 3, 4, 5]

export default class PaperMaterialExample extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      animatedElevation: 3
    }
    this.randomElevation = this.randomElevation.bind(this)
  }

  randomElevation () {
    const nextElevation = random(5)
    const { animatedElevation } = this.state
    if (nextElevation === animatedElevation) {
      this.randomElevation()
    } else {
      this.setState({
        animatedElevation: nextElevation
      })
    }
  }

  render () {
    const { animatedElevation } = this.state
    return (
      <Examples title='PaperMaterial'>
        <Example
          className={styles.container}
          title='Elevation'
        >
          {ELEVATIONS.map((elevation) =>
            <PaperMaterial
              className={styles.paper}
              elevation={elevation}
              key={elevation}
            >
              <Body1
                dark
                primary
              >
                {elevation}
              </Body1>
            </PaperMaterial>
          )}
        </Example>

        <Example
          className={styles.container}
          title='Animated'
        >
          <PaperMaterial
            className={styles.paper}
            elevation={animatedElevation}
          >
            <Body1
              dark
              primary
            >
              {animatedElevation}
            </Body1>
          </PaperMaterial>
          <FlatButton
            light
            onClick={this.randomElevation}
            primary
          >
            Randomize elevation
          </FlatButton>
        </Example>
      </Examples>
    )
  }
}
