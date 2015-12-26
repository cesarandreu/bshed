import React, { PropTypes } from 'react'
import keymirror from 'keymirror'
import styles from './Icon.css'

export const ICON_TYPES = keymirror({
  ADD: null,
  BIKE: null,
  CLEAR: null,
  CLOUD_UPLOAD: null,
  IMAGE: null
})

export const ICON_SIZES = {
  SMALL: 18,
  NORMAL: 24,
  LARGE: 48
}

export function getIcon (type) {
  switch (type) {
    case ICON_TYPES.ADD:
      return <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/>
    case ICON_TYPES.BIKE:
      return <path d='M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z'/>
    case ICON_TYPES.CLEAR:
      return <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
    case ICON_TYPES.CLOUD_UPLOAD:
      return <path d='M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z'/>
    case ICON_TYPES.IMAGE:
      return <path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/>
  }
}

// TODO: Change viewBox and path value depending on the size?
export function Icon ({ size, type }) {
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

Icon.defaultProps = {
  size: ICON_SIZES.NORMAL
}

Icon.propTypes = {
  size: PropTypes.oneOf(Object.values(ICON_SIZES)).isRequired,
  type: PropTypes.oneOf(Object.keys(ICON_TYPES)).isRequired
}
