import cn from 'classnames'
import { Example, Examples } from 'components/Example'
// import { Icon, ICON_TYPES } from 'components/Icon'
import { Body2 } from 'components/Text'
import React, { Component } from 'react'
import styles from './Colors.example.css'

const PRIMARY_COLORS = [{
  className: styles.Primary,
  colorValue: 'Blue 500',
  name: 'Primary'
}, {
  className: styles.PrimaryDark,
  colorValue: 'Blue 700',
  name: 'Primary Dark'
}, {
  className: styles.PrimaryLight,
  colorValue: 'Blue 100',
  name: 'Primary Light'
}]

const ACCENT_COLORS = [{
  className: styles.Accent,
  colorValue: 'Pink A200',
  name: 'Accent'
}, {
  className: styles.AccentDark,
  colorValue: 'Pink A400',
  name: 'Accent Dark'
}, {
  className: styles.AccentLight,
  colorValue: 'Pink A100',
  name: 'Accent Light'
}]

const LIGHT_THEME_COLORS = [{
  className: styles.LightThemeStatusBar,
  colorValue: 'Grey 300',
  name: 'StatusBar'
}, {
  className: styles.LightThemeAppBar,
  colorValue: 'Grey 100',
  name: 'AppBar'
}, {
  className: styles.LightThemeBackground,
  colorValue: 'Grey 50',
  name: 'Backgrounds'
}, {
  className: styles.LightThemeCard,
  colorValue: 'White',
  name: 'Cards / Dialogs'
}]

const DARK_THEME_COLORS = [{
  className: styles.DarkThemeStatusBar,
  colorValue: 'Black',
  name: 'StatusBar'
}, {
  className: styles.DarkThemeAppBar,
  colorValue: 'Grey 900',
  name: 'AppBar'
}, {
  className: styles.DarkThemeBackground,
  colorValue: '',
  name: 'Backgrounds'
}, {
  className: styles.DarkThemeCard,
  colorValue: 'Grey 800',
  name: 'Cards / Dialogs'
}]

const OTHER_COLORS = [{
  className: styles.OtherError,
  colorValue: 'Red 500',
  name: 'Error'
// }, {
//   className: styles.OtherDarkDivider,
//   colorValue: 'Dark 0.12%',
//   name: 'Dark divider'
// }, {
//   className: styles.OtherLightDivider,
//   colorValue: 'White 0.12%',
//   name: 'Light divider'
}]

const DARK_TEXT_COLORS = [{
  className: styles.DarkTextPrimary,
  colorValue: 'Black 87%',
  name: 'Dark Primary'
}, {
  className: styles.DarkTextSecondary,
  colorValue: 'Black 54%',
  name: 'Dark Secondary'
}, {
  className: styles.DarkTextDisabled,
  colorValue: 'Black 38%',
  name: 'Dark Disabled / Hint / Icon'
}]

const LIGHT_TEXT_COLORS = [{
  className: styles.LightTextPrimary,
  colorValue: 'White 100%',
  name: 'Light Primary'
}, {
  className: styles.LightTextSecondary,
  colorValue: 'White 70%',
  name: 'Light Secondary'
}, {
  className: styles.LightTextDisabled,
  colorValue: 'White 50%',
  name: 'Light Disabled / Hint / Icon'
}]

// const LIGHT_ICON_COLORS = [{
//   className: styles.LightIconDark,
//   colorValue: <Icon type={ICON_TYPES.FAVORITE}/>,
//   name: 'Dark'
// }, {
//   className: styles.LightIconPrimary,
//   colorValue: <Icon type={ICON_TYPES.FAVORITE}/>,
//   name: 'Primary'
// }, {
//   className: styles.LightIconAccent,
//   colorValue: <Icon type={ICON_TYPES.FAVORITE}/>,
//   name: 'Accent'
// }]

// const DARK_ICON_COLORS = [{
//   className: styles.DarkIconLight,
//   colorValue: <Icon type={ICON_TYPES.FAVORITE}/>,
//   name: 'Light'
// }, {
//   className: styles.DarkIconPrimary,
//   colorValue: <Icon type={ICON_TYPES.FAVORITE}/>,
//   name: 'Primary'
// }, {
//   className: styles.DarkIconAccent,
//   colorValue: <Icon type={ICON_TYPES.FAVORITE}/>,
//   name: 'Accent'
// }]

const COLORS = [{
  colors: PRIMARY_COLORS,
  title: 'Primary'
}, {
  colors: ACCENT_COLORS,
  title: 'Accent'
}, {
  colors: LIGHT_THEME_COLORS,
  title: 'Light Theme'
}, {
  colors: DARK_THEME_COLORS,
  title: 'Dark Theme'
}, {
  colors: OTHER_COLORS,
  title: 'Other'
}, {
  colors: DARK_TEXT_COLORS,
  title: 'Dark text on light background'
}, {
  colors: LIGHT_TEXT_COLORS,
  title: 'White text on dark background'
// }, {
//   colors: LIGHT_ICON_COLORS,
//   title: 'Light Icon'
// }, {
//   colors: DARK_ICON_COLORS,
//   title: 'Dark Icon'
}]

export default class ColorsExample extends Component {
  render () {
    return (
      <Examples title='Colors'>
        {COLORS.map(({ colors, title }) =>
          <ColorExample
            colors={colors}
            key={title}
            title={title}
          />
        )}
      </Examples>
    )
  }
}

function ColorExample ({ colors, title }) {
  return (
    <Example
      light
      title={title}
    >
      <div className={styles.container}>
        {colors.map(({ className, colorValue, name }, idx) =>
          <Color
            className={className}
            colorValue={colorValue}
            key={idx}
            name={name}
          />
        )}
      </div>
    </Example>
  )
}

function Color ({ className, colorValue, name }) {
  return (
    <div className={cn(styles.color, className)}>
      <Body2 custom>
        {name}
      </Body2>
      <Body2 custom>
        {colorValue}
      </Body2>
    </div>
  )
}
