import * as BikeshedBuilderActions from '../../actions/BikeshedBuilderActions'
import React, { Component, PropTypes } from 'react'
import BikeshedBuilder from './BikeshedBuilder'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

@connect(({ bikeshedBuilder }) => ({
  bikeshedBuilder
}))
export default class BikeshedBuilderContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    bikeshedBuilder: PropTypes.object.isRequired
  }

  render () {
    const { dispatch, bikeshedBuilder } = this.props
    return (
      <BikeshedBuilder
        bikeshedBuilder={bikeshedBuilder}
        { ...bindActionCreators(BikeshedBuilderActions, dispatch) }
      />
    )
  }
}
