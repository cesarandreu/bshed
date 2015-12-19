import React, { PropTypes } from 'react'
import keymirror from 'keymirror'

export const ICON_TYPES = keymirror({
  CLEAR: null,
  CLOUD_UPLOAD: null
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
    case ICON_TYPES.CLOUD_UPLOAD:
      return <path d='M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z'/>
  }
}

// TODO: Change viewBox and path value depending on the size?
export function Icon ({ size, type }) {
  return (
    <svg
      fill='currentColor'
      height={size}
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      {getIcon(type)}
      <path d='M0 0h24v24H0z' fill='none'/>
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
