import { clearNavigateTo } from '../../actions/NavigateActions'
import { transitionTo } from 'redux-react-router'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

@connect(state => state.navigate, {
  clearNavigateTo,
  transitionTo
})
export class NavigateContainer extends Component {
  static propTypes = {
    url: PropTypes.string,
    children: PropTypes.node.isRequired,
    transitionTo: PropTypes.func.isRequired,
    clearNavigateTo: PropTypes.func.isRequired
  }

  componentWillReceiveProps: componentWillReceiveProps

  render () {
    return this.props.children
  }
}
export default NavigateContainer

export function componentWillReceiveProps (nextProps) {
  const { url, transitionTo, clearNavigateTo } = nextProps
  if (url) {
    clearNavigateTo()
    transitionTo(url)
  }
}
