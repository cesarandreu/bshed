/**
 * These are all the Text components the app uses
 * The elements used by some of these were inspired by PolymerElements/paper-styles
 * h1 => display2
 * h2 => display1
 * h3 => headline
 * h4 => subhead
 * They also have h5, h6 => body2, but I don't know if that's useful
 */
import cn from 'classnames'
import React, { PropTypes } from 'react'
import styles from './Text.css'

export function textComponentFactory ({ defaultColorClassName, name, type }) {
  const textClassName = styles[name]
  function TextComponent ({
    className,
    custom,
    dark,
    disabled,
    hint,
    light,
    primary,
    secondary,
    ...props
  }) {
    const noTheme = !dark && !light
    const noColor = !disabled && !hint && !primary && !secondary

    return React.createElement(type, {
      className: cn(textClassName, className, {
        [defaultColorClassName]: !custom && noTheme && noColor,
        [styles.DarkDisabled]: dark && disabled,
        [styles.DarkHint]: dark && hint,
        [styles.DarkPrimary]: dark && primary,
        [styles.DarkSecondary]: dark && secondary,
        [styles.LightDisabled]: light && disabled,
        [styles.LightHint]: light && hint,
        [styles.LightPrimary]: light && primary,
        [styles.LightSecondary]: light && secondary
      }),
      ...props
    })
  }
  Object.assign(TextComponent, {
    displayName: name,
    name: name,
    propTypes: {
      children: PropTypes.node.isRequired,
      className: PropTypes.string,
      custom: PropTypes.bool,
      dark: PropTypes.bool,
      disabled: PropTypes.bool,
      hint: PropTypes.bool,
      light: PropTypes.bool,
      primary: PropTypes.bool,
      secondary: PropTypes.bool
    }
  })
  return TextComponent
}

// Base text components
export const Display4 = textComponentFactory({
  defaultColorClassName: styles.DarkPrimary,
  name: 'Display4',
  type: 'span'
})

export const Display3 = textComponentFactory({
  defaultColorClassName: styles.DarkPrimary,
  name: 'Display3',
  type: 'span'
})

export const Display2 = textComponentFactory({
  defaultColorClassName: styles.DarkPrimary,
  name: 'Display2',
  type: 'h1'
})

export const Display1 = textComponentFactory({
  defaultColorClassName: styles.DarkPrimary,
  name: 'Display1',
  type: 'h2'
})

export const Headline = textComponentFactory({
  defaultColorClassName: styles.DarkPrimary,
  name: 'Headline',
  type: 'h3'
})

export const Title = textComponentFactory({
  defaultColorClassName: styles.DarkPrimary,
  name: 'Title',
  type: 'span'
})

export const Subhead = textComponentFactory({
  defaultColorClassName: styles.DarkPrimary,
  name: 'Subhead',
  type: 'h4'
})

export const Body2 = textComponentFactory({
  defaultColorClassName: styles.DarkPrimary,
  name: 'Body2',
  type: 'span'
})

export const Body1 = textComponentFactory({
  defaultColorClassName: styles.DarkSecondary,
  name: 'Body1',
  type: 'span'
})

export const Caption = textComponentFactory({
  defaultColorClassName: styles.DarkPrimary,
  name: 'Caption',
  type: 'span'
})

export const ButtonText = textComponentFactory({
  defaultColorClassName: styles.DarkPrimary,
  name: 'Button',
  type: 'span'
})

// Alias and wrapper text components
export function Hint (props) {
  return <Caption dark hint {...props}/>
}
