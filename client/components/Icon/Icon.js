/**
 * Icon
 * @flow
 */
import type { ReactElement } from 'react'
import React, { PropTypes } from 'react'
import keymirror from 'keymirror'

export const ICONS = keymirror({
  CLEAR: null,
  ADD: null
})

export function getIcon (type: string): ReactElement {
  switch (type) {
    case ICONS.ADD:
      return <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/>
    case ICONS.CLEAR:
      return <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
  }
}

export function Icon ({ size, type }: Object): ReactElement {
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
Object.assign(Icon, {
  defaultProps: {
    size: 24
  },
  propTypes: {
    size: PropTypes.oneOf([24, 48]).isRequired,
    type: PropTypes.oneOf(Object.keys(ICONS)).isRequired
  }
})
