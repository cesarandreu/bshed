/**
 * Window Size HOC
 * @flow
 */
import debounce from 'lodash.debounce'
import type { ReactClass } from 'react'
import React, { Component, PropTypes } from 'react'
import getDisplayName from '@client/lib/getDisplayName'
import getWindowSize from '@client/lib/getWindowSize'

type HigherOrderComponent = (WrappedComponent: ReactClass) => ReactClass;

export function WindowSize (debounceTime: number = 100): HigherOrderComponent {
  return function windowSizeWrapper (WrappedComponent: ReactClass): ReactClass {
    class WindowSizeComponent extends Component {
      constructor (props, context) {
        super(props, context)
        this.state = {
          windowHeight: 0,
          windowWidth: 0
        }
        this._onResize = this._onResize.bind(this)
        this._debouncedResize = debounce(this._onResize, debounceTime)
      }

      _onResize () {
        const windowSize = getWindowSize()
        this.setState(windowSize)

        const { onResize } = this.props
        if (onResize) {
          onResize(windowSize)
        }
      }

      componentDidMount () {
        this._onResize()
        window.addEventListener('resize', this._debouncedResize, false)
      }

      componentWillUnmount () {
        window.removeEventListener('resize', this._debouncedResize, false)
      }

      render () {
        return (
          <WrappedComponent {...this.state} {...this.props}/>
        )
      }
    }
    WindowSizeComponent.displayName = `WindowSize(${getDisplayName(WrappedComponent)})`
    WindowSizeComponent.propTypes = {
      onResize: PropTypes.func
    }
    return WindowSizeComponent
  }
}
