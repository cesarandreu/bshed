/**
 * Get a Component's displayName
 * @flow
 */
import type { ReactClass } from 'react'

export default function getDisplayName (WrappedComponent: ReactClass): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
