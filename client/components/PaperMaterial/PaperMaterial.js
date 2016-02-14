import cn from 'classnames'
import React, { PropTypes } from 'react'
import styles from './PaperMaterial.css'

export function PaperMaterial ({ children, className, elevation = 1, ...props }) {
  return (
    <div
      className={cn(styles.paper, className, styles[`elevation${elevation}`])}
      {...props}
    >
      {children}
    </div>
  )
}

PaperMaterial.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  elevantion: PropTypes.oneOf([0, 1, 2, 3, 4, 5])
}
