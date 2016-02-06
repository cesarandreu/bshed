import React, { PropTypes } from 'react'
import keymirror from 'keymirror'
import styles from './Icon.css'

export const ICON_TYPES = keymirror({
  CLEAR: null,
  IMAGE: null
})

export const ICON_SIZES = {
  SMALL: 18,
  NORMAL: 24,
  LARGE: 48
}

export function getIcon (type) {
  switch (type) {
    case ICON_TYPES.CLEAR:
      return <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
    case ICON_TYPES.IMAGE:
      return <path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/>
  }
}

export function Icon ({ size = ICON_SIZES.NORMAL, type }) {
  return (
    <svg
      className={styles.icon}
      height={size}
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        {getIcon(type)}
      </g>
    </svg>
  )
}

Icon.propTypes = {
  size: PropTypes.oneOf(Object.values(ICON_SIZES)),
  type: PropTypes.oneOf(Object.keys(ICON_TYPES)).isRequired
}
