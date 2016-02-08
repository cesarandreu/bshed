import { FlatButton, RaisedButton } from 'components/Button'
import { Example, Examples } from 'components/Example'
import React, { Component } from 'react'
import styles from './Button.example.css'

const COLORS = ['dark', 'light']

const FLAT_BUTTONS = COLORS.map(color => ({
  [color]: true,
  buttons: [{
    children: `${color} plain`
  }, {
    children: `${color} primary`,
    primary: true
  }, {
    accent: true,
    children: `${color} accent`
  }, {
    children: `${color} disabled`,
    disabled: true
  }],
  ButtonComponent: FlatButton,
  color: color
}))

const RAISED_BUTTONS = COLORS.map(color => ({
  [color]: true,
  buttons: [{
    children: `${color} primary`,
    primary: true
  }, {
    accent: true,
    children: `${color} accent`
  }, {
    children: `${color} disabled`,
    disabled: true
  }],
  ButtonComponent: RaisedButton,
  color: color
}))

const BUTTONS = [...FLAT_BUTTONS, ...RAISED_BUTTONS]

export default class ButtonExample extends Component {
  render () {
    return (
      <Examples title='Button'>
        {BUTTONS.map(({ ButtonComponent, buttons, color, dark, light }, idx) =>
          <Example
            dark={dark}
            key={`${ButtonComponent.name} ${color}`}
            light={light}
            title={`${ButtonComponent.name} ${color}`}
          >
            <div className={styles.body}>
              {buttons.map((props, idx) =>
                <ButtonComponent
                  dark={dark}
                  key={idx}
                  light={light}
                  {...props}
                />
              )}
            </div>
          </Example>
        )}
      </Examples>
    )
  }
}
