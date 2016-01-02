/**
 * Higher order component for detecting the environment type
 * It uses a media query and the screen size
 * Passes two booleans to WrappedComponent: isDesktop, isMobile
 */
import React, { Component } from 'react'

export function DetectEnvironment (mobileMedia: string) {
  return function detectEnvironmentInner (WrappedComponent) {
    class DetectEnvironmentContainer extends Component {
      constructor (props, context) {
        super(props, context)
        this.state = {
          isDesktop: true,
          isMobile: false
        }
        this._handleMediaChange = this._handleMediaChange.bind(this)
      }

      componentDidMount () {
        this._mediaQueryList = global.matchMedia(mobileMedia)
        this._mediaQueryList.addListener(this._handleMediaChange)
        this._handleMediaChange(this._mediaQueryList)
      }

      componentWillUnmount () {
        this._mediaQueryList.removeListener(this._handleMediaChange)
      }

      _handleMediaChange (mediaQueryList) {
        const isMobile = mediaQueryList.matches
        this.setState({
          isDesktop: !isMobile,
          isMobile: isMobile
        })
      }

      render () {
        return <WrappedComponent {...this.state} {...this.props}/>
      }
    }

    const displayName = WrappedComponent.displayName || WrappedComponent.name
    DetectEnvironmentContainer.displayName = `DetectEnvironment(${displayName})`

    DetectEnvironmentContainer.WrappedComponent = WrappedComponent

    return DetectEnvironmentContainer
  }
}
